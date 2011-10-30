(function(window, doc) {
    var ctx, // canvasオブジェクト
        wh, // canvasの高さ
        ww; // canvasの幅    
    getSize(); // whとwwを更新

    //
    
    var elems = {}; // エレメント周り
    elems.dfm = doc.createDocumentFragment();
    elems.lang = (/ja/.test(navigator.language) ||
    			/ja/.test(navigator.browserLanguage))
    				? true
    				: false;

    elems.insert = function() { // 挿入
        doc.body.appendChild(elems.dfm);
    };

    elems.cvs = (function() { // キャンバス
        var c = doc.createElement('canvas');

        addStyleRule('#canvas', 'display:block;position:absolute;z-index:1;top:0;left:0;');
        c.width = ww;
        c.height = wh;
        c.id = 'canvas';
        elems.dfm.appendChild(c);
        ctx = c.getContext('2d');
        
        var img = new Image();
        img.src = 'canvaslogo.png?' + new Date().getTime();
        img.onload = function() {
            var c1 = c.cloneNode(true),
                ctx1 = c1.getContext('2d');
            doc.body.appendChild(c1);
            ctx1.drawImage(img, ww/2-250, wh/2-150);
            ctx1.fillStyle = '#fff';

            setTimeout(function() {
                var v = 0;
                    var id = setInterval(function() {
                        v += 0.02;
                        ctx1.globalAlpha = v;
                        ctx1.fillRect(0, 0, ww, wh);
                        if(v >= 0.3) {
                            clearInterval(id);
                            doc.body.removeChild(c1);
                        }
                    }, 75);
            }, 1500);
        };
        return c;
    })();
    
/*
    function ef(element) {
    	
    }    
    var method = { // element factory
    	create: function(element) {
    		this.element = doc.createElement(element);
    		return this;
    	},
    	addCss: function(name, css) {    		
    		addStyleRule(name, css);
    		return this;
    	},
    	id: function(name) {
    		this.element.id = name;
    		return this;
    	},
    	class: function(name) {
    		this.element.className = name;
    		return this;
    	}
    }
    
    elems.drawCtrls = ef('div')
    				  .addCss('#drawCtrls', 'background-image:url("black.png");margin-top:' + (-170) + 'px;' + 'position:absolute;top:100%;z-index:2;width:100%;height:' + 170 + 'px;')
    				  .id('#drawCtrls')
    				  .append(elems.dfm)
*/


    elems.drawCtrls = (function() { // 下のウィンドウ
        var d = doc.createElement('div');
        var height = 170;

        addStyleRule('#drawCtrls', 'background-image:url("black.png");margin-top:' + (-170) + 'px;' + 'position:absolute;top:100%;z-index:2;width:100%;height:' + height + 'px;');
        d.id ="drawCtrls";
        elems.dfm.appendChild(d);
        return d;
    })();

    elems.switchCtrls = (function() { // 開け閉めするとこ
        var d = doc.createElement('p');
        d.appendChild(doc.createTextNode('▼'));

        addStyleRule('#switchCtrls', 'display:block;background:#000;opacity:0.8;height:6%;font-size:74%;color:#fff;text-align:center;cursor: pointer;');
        addStyleRule('#switchCtrls:hover', 'background:#ccc;opacity:0.5;color:#000;');
        d.id = 'switchCtrls';
        elems.drawCtrls.appendChild(d);
        return d;
    })();

    elems.viewWrap = (function() {
        var d = doc.createElement('div');
        addStyleRule('#viewWrap', 'height:94%;');
        d.id = 'viewWrap';
        elems.drawCtrls.appendChild(d);
        return d;
    })();

    elems.fnRefer = (function() { // リファレンス枠
        var d = doc.createElement('div');
        addStyleRule('#fnRefer', 'height:22%;padding:0 20px;');
        d.id = "fnRefer";
        elems.viewWrap.appendChild(d);
        return d;
    })();

    elems.fnCgy = (function() { // リファレンスのリスト枠
        var u = doc.createElement('ul');
        u.style.cssText = 'color:#fff;padding-top:2px;';
        elems.fnRefer.appendChild(u);
        return u;
    })();

    elems.mtdCgy = (function() { // メソッドカテゴリリスト
        var l = doc.createElement('li'),
            s = doc.createElement('span'),
            box = doc.createDocumentFragment(),
            items;

        var img = new Image();
        img.src = 'markm.png'; img.alt = 'メソッド';
        s.appendChild(img);

        if(elems.lang) {
            items = ['HTMLCanvasElementのメソッド', '複雑な形状（パス）', '簡単な外形（矩形）', '色とスタイル', 'canvasの状態', '変形', 'ピクセル操作', 'イメージ', 'テキスト', 'フォーカス・マネージメント'];
        } else {
            items = ['HTMLCanvasElementMethod', 'Complex shapes (paths)', 'Simple shapes (rectangles)', 'Colors and styles', 'The canvas state', 'Transformations', 'Pixel manipulation', 'Images', 'Text', 'Focus management'];
        }
        
        l.className = 'fnCgyItem';
        s.className = 'fnCgyItemMark';

        var i = 0, len = items.length;
        for(var elem; i < len; i++) {
            elem = l.cloneNode(true);
            elem.appendChild(s.cloneNode(true));
            elem.appendChild(doc.createTextNode(items[i]));
            items[i] = elem;
            box.appendChild(elem);
        }

        elems.fnCgy.appendChild(box);
        return items;
    })();

    elems.propCgy = (function() { // プロパティカテゴリリスト
        var l = doc.createElement('li'),
            s = doc.createElement('span'),
            box = doc.createDocumentFragment(),
            items;
        
        var img = new Image(); img.src = 'markp.png'; img.alt = 'プロパティ';
        s.appendChild(img);

        if(elems.lang) {
            items = ['色とスタイル', '合成', 'ライン・スタイル', '影', 'テキスト'];
        } else {
            items = ['Colors and styles', 'Compositing', 'Line styles', 'Shadows', 'Text'];
        }
        
        l.className = 'fnCgyItem';
        s.className = 'fnCgyItemMark';

        var i = 0, len = items.length;
        for(var elem; i < len; i++) {
            elem = l.cloneNode(true);
            elem.appendChild(s.cloneNode(true));
            elem.appendChild(doc.createTextNode(items[i]));
            items[i] = elem;
            box.appendChild(elem);
        }

        elems.fnCgy.appendChild(box);
        return items;
    })();

    elems.fnUnder = (function() { // 機能の一覧やら引数入力やらの枠
        var d = doc.createElement('div');
        addStyleRule('#fnUnder', 'background-image:url("black.png");height:78%;padding:0 0.5%;');
        d.id = 'fnUnder';
        d.className = 'clearfix';
        elems.viewWrap.appendChild(d);
        return d;
    })();

    elems.fnListWrap = (function() { // 機能一覧の枠
        var d = doc.createElement('div');
        d.appendChild(d.cloneNode(true));
        addStyleRule('#fnListWrap', 'background-image:url("list.png");width:34%;height:100%;float:left;overflow:auto;');
        d.id = 'fnListWrap';
        d.className = 'clearfix';
        elems.fnUnder.appendChild(d);
        return d;
    })();

    elems.mtdItems = (function() { // メソッドリスト
        var items = [], l = doc.createElement('li');
        l.className = 'fnListItem';
        items[0] = ['toDataURL()', 'getContext()'];
        items[1] = ['beginPath()', 'moveTo()', 'closePath()', 'lineTo()', 'quadraticCurveTo()', 'bezierCurveTo()', 'arcTo()', 'arc()', 'rect()', 'fill()', 'stroke()', 'clip()', 'isPointInPath()'];
        items[2] = ['clearRect()', 'fillRect()', 'strokeRect()'];
        items[3] = ['addColorStop()', 'createLinearGradient()', 'createRadialGradient()', 'createPattern()'];
        items[4] = ['save()', 'restore()'];
        items[5] = ['scale()', 'rotate()', 'translate()', 'transform()', 'setTransform()'];
        items[6] = ['createImageData()', 'getImageData()', 'putImageData1()', 'putImageData2()', 'ImageDataProperties'];
        items[7] = ['drawImage1()', 'drawImage2()', 'drawImage3()'];
        items[8] = ['fillText()', 'strokeText()', 'measureText()'];
        items[9] = ['drawFocusRing()'];

        var i = 0, len = items.length;
        for(;i < len; i++) {
            for(var j = 0, elem;j < items[i].length; j++) {
                elem = l.cloneNode(true);
                elem.appendChild(doc.createTextNode(items[i][j]));
                items[i][j] = elem;
            }
        }
        return items;
    })();

    elems.propItems = (function() { // プロパティリスト
        var items = [], l = doc.createElement('li');
        l.className = 'fnListItem';
        items[0] = ['strokeStyle', 'fillStyle'];
        items[1] = ['globalAlpha', 'globalCompositeOperation'];
        items[2] = ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit'];
        items[3] = ['shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'shadowBlur'];
        items[4] = ['font', 'textAlign', 'textBaseline'];

        var i = 0, len = items.length;
        for(;i < len; i++) {
            for(var j = 0, elem;j < items[i].length; j++) {
                elem = l.cloneNode(true);
                elem.appendChild(doc.createTextNode(items[i][j]));
                items[i][j] = elem;
            }
        }
        return items;
    })();

    elems.fnOpera = (function() { // 引数入力や説明するとこの枠
        var d = doc.createElement('div');
        addStyleRule('#fnOpera', 'width:66%;height:100%;float:left;');
        d.id = 'fnOpera';
        elems.fnUnder.appendChild(d);
        return d;
    })();

    elems.argArea = (function() { // 引数入力するとこ
        var d = doc.createElement('div');
        d.appendChild(doc.createElement('p'));
        d.firstChild.style.height = '20%';
        d.firstChild.style.visibility = 'hidden';
        d.firstChild.appendChild(doc.createTextNode('ダ、ダミーなんだな'));
        addStyleRule('#argArea', 'color:#fff;background-image:url("arginput.png");width:98%;line-height:1.6;padding:0 1%;');
        addStyleRule('#argArea p', 'display:inline;vertical-align:middle;');
        d.id = 'argArea';
        elems.fnOpera.appendChild(d);
        return d;
    })();

    elems.exp = (function() { // 説明するとこ
        var d = doc.createElement('div');
        d.appendChild(doc.createElement('p'));
        d.firstChild.style.height = '20%';
        d.firstChild.style.visibility = 'hidden';
        d.firstChild.appendChild(doc.createTextNode('に、にせものなんだな'));
        addStyleRule('#exp', 'color:#000;background-image:url("exp.png");height:80%;width:99%;line-height:1.2;padding:0 0.5%;overflow:auto;');
        addStyleRule('#exp p', 'font-size:96%;color:#212121;margin:2px 0;overflow:auto;overflow-x:hidden;word-wrap:break-word;');
        addStyleRule('#exp strong', 'color:#900;font-weight:normal;');
        addStyleRule('#exp span', 'color:#00a;');
        d.id = 'exp';
        elems.fnOpera.appendChild(d);
        return d;
    })();

    elems.panel = (function() {
        var d = doc.createElement('div');
        d.style.height = wh - 190 + 'px';
        addStyleRule('#panel', 'z-index:3;position:absolute;top:0;left:100%;margin-left:-280px;width:280px;');
        d.id = 'panel';
        d.className = 'clearfix';
        elems.dfm.appendChild(d);
        return d;
    })();

    elems.switchPanel = (function() {
        var d = doc.createElement('div');
        addStyleRule('#switchPanel', 'background-image:url("y01.png");opacity:0.85;width:20px;height:20px;-webkit-border-top-left-radius: 10px;-webkit-border-bottom-left-radius: 10px;-moz-border-radius-topleft:10px;-moz-border-radius-bottomleft:10px;border-top-left-radius:10px;border-bottom-left-radius:10px;cursor:pointer;float:left;');
        d.id = 'switchPanel';
        addStyleRule('#switchPanel:hover', 'background-image:url("y02.png");');
        elems.panel.appendChild(d);
        return d;
    })();

    elems.panelWrap = (function() {
        var d = doc.createElement('div');
        addStyleRule('#panelWrap', 'background-color:#fff;opacity:0.7;width:260px;height:100%;float:left;-webkit-box-shadow:1px 1px 10px rgba(100, 100, 100, 0.8);-moz-box-shadow:-2px 2px 3px rgba(150, 150, 150, 0.7);box-shadow:-1px 2px 3px rgba(100, 100, 100, 0.7);-webkit-border-bottom-left-radius: 15px;-moz-border-radius-bottomleft:15px;border-bottom-left-radius:10px;');
        d.id = 'panelWrap';
        elems.panel.appendChild(d);
        return d;
    })();

    elems.changePanel = (function() {
        var u = doc.createElement('ul');
        var li = doc.createElement('li');
        var mode = ['code', 'tool', 'howto'];
        addStyleRule('#changeMode', 'background:#000;width:100%;text-align:center;height:20px;list-style-type:none;');
        u.id = 'changeMode';
        addStyleRule('.modeItem', 'font-size:120%;color:#fff;width:80px;height:100%;display:inline-block;text-align:center;cursor:pointer;');
        addStyleRule('.modeItem:hover', 'background-color:#fff;color:#000;');
        li.className = 'modeItem';

        var i = 0, l = mode.length;

        for(var item; i < l; i++) {
            item = li.cloneNode(true);
            item.appendChild(doc.createTextNode(mode[i]));
            u.appendChild(item);
            mode[i] = item;
        }
        elems.panelWrap.appendChild(u);
        return {'u': u, 'item': mode};
    })();

    elems.panelCnt = (function() {
        var d = doc.createElement('div');
        d.style.height = wh - 230 + 'px';
        addStyleRule('#panelCnt', 'color:#000;width:240px;margin:10px auto 0 auto;overflow:hidden;overflow-y:auto;word-wrap:break-word;');
        d.id = 'panelCnt';
        elems.panelWrap.appendChild(d);
        return d;
    })();

    elems.code = (function() {
        var d = doc.createElement('div');
        elems.panelCnt.appendChild(d);
        return d;
    })();

    elems.codeTxtArea = (function() {
        var u = doc.createElement('ul'),
            l = doc.createElement('li');
        l.appendChild(doc.createTextNode('var ctx = canvas.getContent("2d");'));
        u.appendChild(l);
        u.style.height = wh - 270 + 'px';
        addStyleRule('#codeTxtArea','width:230px;padding:2px;margin:0 5px;border:0;overflow:auto;overflow-x:hidden;white-space:pre-wrap;');
        addStyleRule('#codeTxtArea li', 'word-wrap:break-word;');
        addStyleRule('#codeTxtArea li:nth-child(even)', 'background-color:#d4cc83;');
        u.id = 'codeTxtArea';
        elems.code.appendChild(u);
        return u;
    })();

    elems.codeBtn = (function() {
        var u = doc.createElement('ul'),
            li = doc.createElement('li'),
            s = doc.createElement('span');
        var btn = ['Clear', 'Undo', 'Copy'];

        addStyleRule('#codeBtn', 'margin-top:5px;');
        u.id = 'codeBtn';
        addStyleRule('.btnItem', 'color:#fff;margin:0 5px;font-size:120%;width:70px;height:25px;display:inline-block;text-align:center;cursor:pointer;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;background:#41b611;background:-webkit-gradient(linear, left top, left bottom, from(#81f651), to(#41b611));background:-moz-linear-gradient(top, #81f651, #41b611);');
        addStyleRule('.btnItem:hover', 'color:#000;');
        li.className = 'btnItem';
        addStyleRule('.btnItem span', 'vertical-align:middle;');

        var i = 0, l = btn.length;

        for(var item, text; i < l; i++) {
            item = li.cloneNode(true);
            text = s.cloneNode(true);
            text.appendChild(doc.createTextNode(btn[i]));
            item.appendChild(text);
            u.appendChild(item);
            btn[i] = item;
        }
        elems.code.appendChild(u);
        return { 'u': u, 'item': btn };
    })();

    elems.tool = (function() {
        var d = doc.createElement('div');    
        return d;
    })();

    elems.toolArea = (function(){
        // canvas size
        var h = doc.createElement('h1'),
            p = doc.createElement('p'),
            input = doc.createElement('input');
        h.className = 'panelHeading';
        input.type = 'text';
        input.className = 'inputNumTool';
        input.setAttribute('readonly', 'readonly');
        
        var h1 = h.cloneNode(true);
        h1.appendChild(doc.createTextNode('CanvasSize'));
        elems.tool.appendChild(h1);

        var p1 = p.cloneNode(true),
            width = input.cloneNode(true),
            height = input.cloneNode(true);
        width.value = ww;
        height.value = wh;
        
        p1.appendChild(doc.createTextNode('width: '));
        p1.appendChild(width);
        p1.appendChild(doc.createTextNode(' height: '));
        p1.appendChild(height);
        elems.tool.appendChild(p1);

        //canvas coordinates
        var h2 = h.cloneNode(true);
        h2.appendChild(doc.createTextNode('CanvasCoordinates'));
        elems.tool.appendChild(h2);

        var p2 = p.cloneNode(true),
            x = input.cloneNode(true),
            y = input.cloneNode(true);
        x.value = 0; y.value = 0;
        
        p2.appendChild(doc.createTextNode('x : '));
        p2.appendChild(x);
        p2.appendChild(doc.createTextNode(' y : '));
        p2.appendChild(y);
        elems.tool.appendChild(p2);

        var p3 = p.cloneNode(true),
            clickX = input.cloneNode(true),
            clickY = input.cloneNode(true);

        p3.style.cssText = 'margin-top:15px;';
        p3.appendChild(doc.createTextNode('【Click To Save The Coordinates】'));
        p3.appendChild(doc.createElement('br'));
        p3.appendChild(doc.createTextNode('x : '));
        p3.appendChild(clickX);
        p3.appendChild(doc.createTextNode(' y : '));
        p3.appendChild(clickY);        
        elems.tool.appendChild(p3);

        // canvas color picker
        var h3 = h.cloneNode(true);
        h3.appendChild(doc.createTextNode('ColorPicker'));
        elems.tool.appendChild(h3);

        var p4 = p.cloneNode(true),
            cpick = doc.createElement('input');
        cpick.style.cssText = 'text-align:center;width:55px;';
        cpick.name = 'c2';
        cpick.value = '#aa0000';
        cpick.id = 't2';
        cpick.setAttribute('readonly', 'readonly');
        cpick.className = 'html5jp-cpick [coloring:true]';
        p4.appendChild(doc.createTextNode('Hexadecimal: '));
        p4.appendChild(cpick);
        elems.tool.appendChild(p4);

        _colorInit(cpick); // cpick.jsの初期化をグローバルにひっぱってきて利用している。注意。

        var p5 = p.cloneNode(true),
            rgb = doc.createElement('input'); // cpick.jsから値が送られてくるので注意。強引だけど仕方がない。
        rgb.id = 'rgbcolor';
        rgb.className = 'inputColor';
        rgb.setAttribute('readonly', 'readonly');
        rgb.style.cssText = 'outline:#00f solid 1px;width:110px;';

        p5.style.cssText = 'margin-top:5px;';
        p5.appendChild(doc.createTextNode('Functional: '));
        p5.appendChild(rgb);
        elems.tool.appendChild(p5);
        
        return { wSize: width, hSize: height, cx: x, cy: y, clickX: clickX, clickY: clickY, cpick: cpick, rgb: rgb };
    })();

    elems.howto = (function() {
        var d = doc.createElement('div'),
            h = doc.createElement('h1'),
            p = doc.createElement('p');
        h.className = 'panelHeading';

        var h1 = h.cloneNode(true),
            p1 = p.cloneNode(true);
        h1.appendChild(doc.createTextNode('Use'));
        p1.innerHTML = '<a href="http://d.hatena.ne.jp/sandai/20101211/p1" target="blank">http://d.hatena.ne.jp/sandai/20101211/p1</a>';
        d.appendChild(h1);
        d.appendChild(p1);

        var h2 = h.cloneNode(true),
            p2 = p.cloneNode(true);
        h2.appendChild(doc.createTextNode('FirstCanvas?'));
        p2.appendChild(doc.createTextNode('JavaScriptを使って図形を描くことができるcanvasの学習アプリ。'));
        d.appendChild(h2);
        d.appendChild(p2);        
        
        var h3 = h.cloneNode(true),
            p3 = p.cloneNode(true);
        h3.appendChild(doc.createTextNode('MoreStudy'));
        p3.innerHTML = '<ul style="margin-left:15px;">' +
            '<li><a href="http://www.html5.jp/canvas/index.html" target="blank">Canvas - HTML5.JP</a></li>' +
            '<li><a href="https://developer.mozilla.org/ja/Canvas_tutorial" target="blank">Canvas_tutorial</a></li>' +
            '<li><a href="http://jsdo.it/" target="blank">jsdo.it</a></li>' +
            '</ul>';
        d.appendChild(h3);
        d.appendChild(p3);
        
        var h4 = h.cloneNode(true),
            p4 = p.cloneNode(true);
        h4.appendChild(doc.createTextNode('Contact'));
        p4.innerHTML = '<ul style="margin-left:15px;">' +
            '<li><a href="http://twitter.com/#!/sandai" target="blank">twitter: @sandai</a></li>' +
            '<li><a href="http://d.hatena.ne.jp/sandai/" target="blank">hatena id: sandai</a></li>' +
            '<li>gmail: sandai310@...</li>' +
            '</ul>';
        d.appendChild(h4);
        d.appendChild(p4);

        return d;        
    })();
        
    elems.newsBrd = (function() {
        var d = doc.createElement('div'),
        p = doc.createElement('p');
        d.appendChild(p);
        addStyleRule('#newsBrd', 'color:#fff;position:absolute;top:-50px;left:10px;background:#000;-webkit-box-shadow:0 1px 5px #aaa;-moz-box-shadow:0 1px 5px #aaa;box-shadow:0 1px 5px #aaa;padding:10px;-webkit-border-bottom-right-radius:5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-bottomright:5px;-moz-border-radius-bottomleft:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;opacity:0.7;z-index:4;cursor:pointer;');
        d.id = 'newsBrd';
        elems.dfm.appendChild(d);
        return {'d': d, 'p': p};
    })();


    elems.tt = (function() {
        var d = doc.createElement('div');
        addStyleRule('#tooltip', 'font-size:87%;position:absolute;margin-top:-170px;z-index:5;opacity:0.9;');
        d.id = 'tooltip';
        return d;
    })();

    elems.ttInner = (function() {
        var d =  doc.createElement('div');
        addStyleRule('#tooltip #inner', 'background-color:#fff;padding:5px;border:3px #e10000 solid;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;');
        d.id = 'inner';
        elems.tt.appendChild(d);
        return d;
    })();

    elems.ttArrow = (function() {
        var d = doc.createElement('div');
        addStyleRule('#tooltip #arrow', 'margin:0 auto;font-size:0px;line-height:0%;width:0px;border-top:10px solid #e10000;border-left:6px solid transparent;border-right:6px solid transparent;');
        d.id = 'arrow';
        elems.tt.appendChild(d);
        return d;
    })();

    elems.fileForm = (function(){
        var d = doc.createElement('div'),
            input = doc.createElement('input'),
            p = doc.createElement('p'),
            mes = doc.createElement('div');

        var img = new Image();
        img.src = 'addimage.gif';
        
        input.type = 'file';
        addStyleRule('#inputfile', 'margin:0 auto;');
        input.id = 'inputfile';
        
        addStyleRule('#filewin', 'text-align:center;width:250px;height:120px;padding:10px;position:absolute;top:50%;left:50%;margin:-60px 0 0 -125px;z-index:10;background:rgba(255, 255, 255, 0.9);-webkit-box-shadow:0 0 1px #000;-moz-box-shadow:0 0 2px #999;box-shadow:0 0 1px #999;white-space:pre-wrap');
        d.id = 'filewin';

        p.innerHTML = 'イメージファイルを追加できます。<br />gif, png, jpegのファイルのみ利用可能。';

        addStyleRule('#message', 'color:#222;margin-top:10px;width:100%;height:15px;text-align:center;background:rgba(100, 100, 100, 0.5);-webkit-border-radius:7.5px;-moz-border-radius:7.5px;border-rudius:7.5px;');
        mes.id = 'message';
        
        d.appendChild(img);
        d.appendChild(p);
        d.appendChild(input);
        d.appendChild(mes);
        return {d: d, input: input, mes: mes};
    })();

    //

    elems.fnItem = (function(u) { // divとulでラップしたやつ
        return {
            'mtd': u.createList(elems.mtdItems),
            'prop': u.createList(elems.propItems)
        };
    })({
        ul: function() {
            var u = doc.createElement('ul');
            addStyleRule('.fnList', 'width:50%;float:left;margin-top:5px;');
            u.className = 'fnList';
            return u;
        },
        useUl: function(num) {
            var ret = [];
            if(num > 1) {
                ret[0] = this.ul();
                ret[1] = ret[0].cloneNode(true);
            } else if(num < 2) {
                ret = this.ul();
            }
            return ret;
        },
        createList: function(list) {
            var u, box;
            var d = doc.createElement('div'),
                ret = [],
                item = list;
            
            d.className = 'fnListFloat';

            for(var i = 0, l = list.length; i < l; i++) {
                box = d.cloneNode(true);
                if(list[i].length > 1) {
                    u = this.useUl(2);
                    for(var j = 0; j < list[i].length; j++) {
                        if(j % 2) u[1].appendChild(list[i][j]);
                        else u[0].appendChild(list[i][j]);
                    }
                    box.appendChild(u[0]);
                    box.appendChild(u[1]);
                } else {
                    u = this.useUl(1);
                    u.appendChild(list[i][0]);
                    box.appendChild(u);
                }
                ret[i] = box;
            }
            return ret;
        } 
    });

    //

    var fnEvts = function() { // カテゴリとメソッド、プロパティitemのイベント
        fnEvts.evt(elems.mtdCgy, elems.fnItem['mtd']);
        fnEvts.evt(elems.propCgy, elems.fnItem['prop']);
    };

    fnEvts.clickCgy = null;
    fnEvts.clickItem = null;

    fnEvts.evt = function(cgy, item) {
        var i = 0;

        (function() {
            var _i = i;
            addListener(cgy[_i], 'mouseover', function() {
                if(fnEvts.clickCgy === cgy[_i]) return;
                if(elems.fnListWrap.hasChildNodes()) {
                    elems.fnListWrap.replaceChild(item[_i], elems.fnListWrap.firstChild);
                } else {
                    elems.fnListWrap.appendChild(item[_i]);	
                }
            });

            addListener(cgy[_i], 'mouseout', function() {
                if(fnEvts.clickItem === elems.fnListWrap.firstChild) return;
                if(fnEvts.clickItem) {
                    elems.fnListWrap.replaceChild(fnEvts.clickItem, elems.fnListWrap.firstChild);			
                } else {
                    elems.fnListWrap.removeChild(elems.fnListWrap.firstChild);
                }
            });

            addListener(cgy[_i], 'click', function() {
                if(fnEvts.clickCgy && fnEvts.clickItem) {
                    fnEvts.clickCgy.removeAttribute('id'); 
                    fnEvts.clickItem.className = 'fnListFloat';
                }
                cgy[_i].setAttribute('id', 'fnCgyItemClick');
                item[_i].className = 'fnListFloatClick';
                fnEvts.clickCgy = cgy[_i];
                fnEvts.clickItem = item[_i];
            });	

            i += 1;
            if(i < cgy.length) arguments.callee();
        })();
    };

    //

    var Rc = function() {
        ex(this, Nbs);
        ex(this, Panel);
        ex(this, Tooltip);
        this.count = {
            toDataURL: 0,
            isPointInPath: 0,
            gradient: 0,
            createPattern: 0,
            getImageData: 0,
            ImageDataProperties: 0,
            drawImage: 0,
            measureText: 0
        };
        this.name = null; // 現在利用中のメソッドやプロパティ名
        this.gradient = {}; // CanvasGradientオブジェクト
        this.imagedata = {}; // ImageDataオブジェクト
        this.selectObjPropName = []; // 現在あるCanvasGradient/imagedataオブジェクトのプロパティ名
        this.ptnimage = {
            'ptnimg01.gif': toCanvasElement('/firstcanvas/img/ptnimg01.gif'),
            'ptnimg02.gif': toCanvasElement('/firstcanvas/img/ptnimg02.gif')
        };
        this.drawimage = {
            'dimg01.jpg': toCanvasElement('/firstcanvas/img/dimg01.jpg'),
            'dimg02.jpg': toCanvasElement('/firstcanvas/img/dimg02.jpg'),
            'dimg03.jpg': toCanvasElement('/firstcanvas/img/dimg03.jpg')
        };
    };

    Rc.prototype.enterButton = (function() {
        var b = doc.createElement('div');
        b.appendChild(doc.createTextNode('Run'));
        addStyleRule('#enterBtn', 'font-size:88%;color:#fff;width:45px;text-align:center;height:18px;border:0;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:inline-block;cursor:pointer;background:#ba2241;background:-webkit-gradient(linear, left top, left bottom, from(#ea4261), to(#aa1231));background:-moz-linear-gradient(top, #ea4261, #aa1231);');
        addStyleRule('#enterBtn:hover', 'color:#000;');
        b.id = 'enterBtn';
        b.setAttribute('tabindex', 0);
        return function() {
            var ret = b.cloneNode(true);
            var self = this;
            addListener(ret, 'mousedown', this.onMouseDownBtn);
            addListener(ret, 'mouseup', this.onMouseUpBtn);
            if(!window.opera) { // operaはenterもclickイベントになるらしいのでkeyupとかぶる
                addListener(ret, 'keyup', this.onkeyupBtn());
            }
            addListener(ret, 'click', this.onClickBtn());
            return ret;
        };
    })();

    Rc.prototype.ready = function(txt) { // 準備
        this.name = this.trimOfParens(txt);
        this.replaceData(this.name);
        this.insertDom();
    };

    Rc.prototype.panelReady = function() {
        var i = 0, btns = elems.codeBtn.item;
        for(;i < btns.length; i++) {
            // codeのボタンイベント
            addListener(btns[i], 'mousedown', this.onMouseDownPanelBtn);
            addListener(btns[i], 'mouseup', this.onMouseUpPanelBtn);
            addListener(btns[i], 'click', this['clickBtn' + btns[i].firstChild.firstChild.nodeValue]());

        }
        // toolのイベント
        this.coordinatesEvt('add');
    };
    
    Rc.prototype.insertDom = function() { // expとargをdomツリーに挿入
        var arg = elems.argArea, exp = elems.exp;
        if(arg.hasChildNodes()) {
            arg.removeChild(arg.firstChild);
            this.formInit();
        }
        if(exp.hasChildNodes()) exp.removeChild(exp.firstChild);

        // 一度呼び出したことがあるのならnodeになっている
        if(this.data.type.nodeType === 1) {
            arg.appendChild(this.data.type);
        } else {
            arg.appendChild(this.makeArg());
        }

        this.updateSelectObject();
        exp.appendChild(this.makeExp());
    };

    Rc.prototype.updateSelectObject = function() {
        var name = this.name;
        if(name === 'addColorStop' ||
           name === 'ImageDataProperties' ||
           /putImageData/.test(name) ||
           /drawImage/.test(name)) {
            this.createSelectObject(this.data.arg[0].name);
        }        
    };

    Rc.prototype.createSelectObject = function(name) {
        var o = doc.createElement('option');
        if(!this.isEmptyObject(this[name])) {            
            this.data.arg[0].innerHTML = '';
            for(var key in this[name]) {
                var oc = o.cloneNode(true);
                oc.value = key;
                oc.appendChild(doc.createTextNode(key));
                this.data.arg[0].appendChild(oc);
            }
            
            if(/drawImage/.test(this.name) && window.File) { // file api
                var add = o.cloneNode(true);
                add.style.cssText = 'background-color:#aaa;';
                add.setAttribute('value', 'addImage'); // defaultValue
                add.appendChild(doc.createTextNode('...add Image'));
                this.data.arg[0].appendChild(add);
            }
        } else {
            if(this.data.arg[0].firstChild.value !== 'none') {
                this.data.arg[0].innerHTML = '';            
                var oc = o.cloneNode(true);
                oc.value = 'none';
                oc.appendChild(doc.createTextNode('none'));
                this.data.arg[0].appendChild(oc);
            }
        }
    };

    Rc.prototype.isEmptyObject = function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };

    Rc.prototype.deleteSelectObject = function(name) {
        var obj;
        if('createLinearGradient' === name ||
           'createRadialGradient' === name) {
            obj = 'gradient';
        } else if('getImageData' === name){
            obj = 'imagedata';
        } else {
            return;
        }

        var n = this.selectObjPropName.pop();
        delete this[obj][n];
        this.updateSelectObject();
    };
    
    Rc.prototype.clearObject = function() {
        this.gradient = {}; // CanvasGradientオブジェクト
        this.imagedata = {}; // ImageDataオブジェクト
        this.selectObjPropName = []; // 現在あるCanvasGradient/imagedataオブジェクトのプロパティ名
        this.updateSelectObject(); 
    };
    
    Rc.prototype.makeArg = function() {
        var argelems = this.servNormalizeArgs(),
            p = doc.createElement('p'),
            s = doc.createElement('span'),
            name = this.trimOfNameNumber(this.name);
        
        var i = 0, l = argelems.length;
        
        if(this.name === 'addColorStop' ||
           this.name === 'ImageDataProperties') {
            p.appendChild(argelems[0]);
            p.appendChild(doc.createTextNode('.'));
            this.data.arg[0] = argelems[0];
            i += 1;
        }

        if(this.name !== 'ImageDataProperties') {
            if(this.nameType === 'mtd') {
                p.appendChild(doc.createTextNode(name + ' ( '));
                p.appendChild(s);
                p.appendChild(doc.createTextNode(' ) '));
            } else if(this.nameType === 'prop') {
                p.appendChild(doc.createTextNode(name + ' = '));
                p.appendChild(s);
                p.appendChild(doc.createTextNode(' '));
            }
        } else {           
            p.appendChild(s);
            p.appendChild(doc.createTextNode(' '));
        }

        for(; i < l; i++) {
            if(argelems[i] != null) {
                s.appendChild(argelems[i]);
                this.data.arg[i] = argelems[i];
            } else {
                s.appendChild(doc.createTextNode(this.data.arg[i]));
            }
            if((l-1) > i) {
                s.appendChild(doc.createTextNode(' , '));
            }
        }
        
        p.appendChild(this.enterButton());
        this.data.type = p;
        return p;
    };

    Rc.prototype.makeExp = function() {
        var p = doc.createElement('p');
        p.innerHTML = this.data.exp;
        return p;
    };

    Rc.prototype.servNormalizeArgs = function() {	
        return this.data.type.map(function(type, index) {
            var retelem;
                if(type !== 'notype') {
                    switch(type) {
                      case 'select':
                        retelem = doc.createElement('select'),
                        retelem.name = type;

                        var o = doc.createElement('option');
                        var arg = this.data.arg[index], i = 0, l = arg.length;
                        for(var e; i < l; i++) {
                            e = o.cloneNode(true);
                            e.value = arg[i];
                            e.appendChild(doc.createTextNode(arg[i]));
                            retelem.appendChild(e);
                        }
                        break;
                      case 'num':
                        retelem = doc.createElement('input');
                        retelem.type = 'text';
                        retelem.name = type;
                        retelem.setAttribute('value', this.data.arg[index]); // defaultValue
                        retelem.className = 'inputNum inputBlur';
                        // プレースホルダー GCのみ対応なので保留
                        // retelem.placeholder = this.data.arg[index];
                        addListener(retelem, 'focus', this.onFocusInput);
                        addListener(retelem, 'blur', this.onBlurInput);
                        break;
                      case 'str':
                        retelem = doc.createElement('input');
                        retelem.type = 'text';
                        retelem.name = type;
                        retelem.setAttribute('value', this.data.arg[index]); // defaultValue
                        retelem.className = 'inputStr inputBlur';
                        // プレースホルダー GCのみ対応なので保留
                        // retelem.placeholder = this.data.arg[index];
                        addListener(retelem, 'focus', this.onFocusInput);
                        addListener(retelem, 'blur', this.onBlurInput);
                        break;
                      case 'angle':
                        retelem = doc.createElement('input');
                        retelem.type = 'text';
                        retelem.name = type;
                        retelem.setAttribute('value', this.data.arg[index]); // defaultValue
                        retelem.className = 'inputNum inputBlur';
                        // プレースホルダー GCのみ対応なので保留
                        // retelem.placeholder = this.data.arg[index];
                        addListener(retelem, 'focus', this.onFocusAngle()); // onFocus.callを内部で呼び出し
                        addListener(retelem, 'blur', this.onBlurAngle());  // onBlur.callを内部で呼び出し
                        addListener(retelem, 'keyup', this.onKeyupAngle());
                        break;
                      case 'gradient':
                        retelem = doc.createElement('select');
                        retelem.name = type;

                        var o = doc.createElement('option');
                        o.value = this.data.arg[index];
                        o.appendChild(doc.createTextNode(this.data.arg[index]));
                        retelem.appendChild(o);
                        addListener(retelem, 'focus', this.onFocusGrad());
                        addListener(retelem, 'blur', this.onBlurGrad());
                        break;
                      case 'imagedata':
                        retelem = doc.createElement('select');
                        retelem.name = type;

                        var o = doc.createElement('option');
                        o.value = this.data.arg[index];
                        o.appendChild(doc.createTextNode(this.data.arg[index]));
                        retelem.appendChild(o);
                        addListener(retelem, 'focus', this.onFocusImageData());
                        addListener(retelem, 'blur', this.onBlurImageData());
                        addListener(retelem, 'change', this.onChangeImageData());
                        break;
                      case 'color':
                      case 'colorplus':
                        retelem = doc.createElement('input');
                        retelem.type = 'text';
                        retelem.name = type;
                        retelem.setAttribute('value', this.data.arg[index]); // defaultValue
                        retelem.className = 'inputColor inputBlur';
                        // プレースホルダー GCのみ対応なので保留
                        // retelem.placeholder = this.data.arg[index];
                        addListener(retelem, 'focus', this.onFocusColor()); // onFocus.callを内部で呼び出し
                        addListener(retelem, 'blur', this.onBlurColor()); // onFocus.callを内部で呼び出し
                        break;
                     case 'ptnimage':
                     case 'drawimage':
                        retelem = doc.createElement('select'),
                        retelem.name = type;

                        var o = doc.createElement('option');
                        var arg = this.data.arg[index], i = 0, l = arg.length;
                        for(var e; i < l; i++) {
                            e = o.cloneNode(true);
                            e.value = arg[i];
                            e.appendChild(doc.createTextNode(arg[i]));
                            retelem.appendChild(e);
                        }

                        if(window.File) {
                            o.style.cssText = 'background-color:#aaa;';
                            o.setAttribute('value', 'addImage'); // defaultValue
                            o.appendChild(doc.createTextNode('...add Image'));
                            retelem.appendChild(o);

                            var f = new IFR(retelem, this[type]);
                            f.init();
                        }

                        addListener(retelem, 'focus', this.onFocusImage(type)); // onFocus.callを内部で呼び出し
                        addListener(retelem, 'blur', this.onBlurImage()); // onFocus.callを内部で呼び出し
                        addListener(retelem, 'change', this.onChangeImage(type));
                        break;
                    }
                } else {
                    retelem = null;
                }
	        // html5 Op GC (FFやIEは利用できないため今のところcanvasEvtでfocus統一)
            //if(!index && retelem != null) retelem.autofocus = true;
            return retelem;
        }, this);
    };

    Rc.prototype.replaceData = (function() {
        // type: [],
        // arg: [],
        // exp: '<strong>【構文】</strong>',
        // exp1: '<strong>【解説】</strong>',
        // exp2: '<strong>【詳細】</strong><a href="" target="blank"></a>'
        // 一度呼び出した後は生成されたelementを保存して、以後それを呼び出す形
        // type -> 生成したargAreaのelementの参照
        // arg  -> valueのアクセスに利用する各input要素の参照。最初のargの値は全て文字列
        //　exp  -> 構文や解説
        var member = {
            'toDataURL': {
                type: ['select'],
                arg: [['image/png', 'image/jpeg']],
                exp: 'url = canvas.toDataURL( <span>type</span> : 画像フォーマット);',
                exp1: '描画内容を画像データとして取得（data:URLの形式で返ってくる）できます。デフォルトは"image/png"なので、pngで取得したければcanvas.toDataURL()と引数無しでも問題ありません。その他使い方や詳しい情報は詳細URLを参照。FisrtCanvasでは実践的な1つの例として、実行ボタンを押すと新規タブにて画像データを表示するようにしています。',
                exp2: 'http://www.html5.jp/canvas/ref/HTMLCanvasElement/toDataURL.html'
            },
            'getContext': {
                type: ['notype'],
                arg: ['contextId'],
                exp: 'ctx = canvas.getContext( <span>contextId</span> : id);',
                exp1: 'canvasを利用するときは必ず最初に呼び出し、返ってきたオブジェクトを使って線や円など描画させます。<span>contextId</span>は現在"2d"のみ利用可。"3d"などありますが実践的に扱える段階ではないので詳細は省きます。FirstCanvasでは紹介だけで実行ボタン押しても何も起きませんが、codeパネルでは常に最初に実行されていることが分かるよう表示しています。このようにcanvasを使うときは最初に必ず呼び出します。',
                exp2: 'http://www.html5.jp/canvas/ref/HTMLCanvasElement/getContext.html'
            },
            'beginPath': {
                type: ['notype'],
                arg: [''],
                exp: 'ctx.beginPath( );',
                exp1: 'パスを初期化します。パスとはcanvasの座標情報のことで、具体的にはcanvasで描かれた線の集合のこと。そのうちのある1つの線をサブパスと言います。線には始点と終点が存在しますが、その2点間を直線や曲線で結んだものがサブパスです。このメソッドはそのサブパスをリセット(描画を消すというわけではない)するものですね。と、微妙に難しいので詳細URL先のサンプルや<a href="/firstcanvas/sample.html#beginPath" target="blank">補助サンプル</a>をいじって慣れてからだとパスは理解しやすいかと思います。',
                exp2: 'http://www.html5.jp/canvas/ref/method/beginPath.html'
            },
            'moveTo': {
                type: ['num', 'num'],
                arg: ['x', 'y'],
                exp: 'ctx.moveTo(<span>x</span> : x座標, <span>y</span> : y座標);',
                exp1: '新規のサブパスを生成します。簡単に言うと、新しく直線や曲線など描くときの始点を定めることができます。使い方は<a href="http://www.html5.jp/canvas/ref/method/lineTo.html" target="blank">lineTo()のサンプル</a>や<a href="/firstcanvas/sample.html#moveTo" target="blank">補助サンプル</a>などで確認してください。確認できたら、試しにmoveTo()とlineTo()を利用して三角と四角をそれぞれ離れた位置でbeginPath()を使わずに描画させてみましょう。それができればmoveTo()の理解が深まるかと思います。',
                exp2: 'http://www.html5.jp/canvas/ref/method/moveTo.html'
            },
            'closePath': {
                type: ['notype'],
                arg: [''],
                exp: 'ctx.closePath( );',
                exp1: '現在のサブパスから前のサブパスの始点まで直線を描きます。例えば三角形を一筆書きのように描くとして、2画目までで「∧」こんな形で描きました。この状態でclosePath()をすると「△」こうなります。正しく表現すればこれはパスを閉じたことになります。少し使えば扱い方は分かると思うので、は詳細URLのサンプルをいじってみましょう。',
                exp2: 'http://www.html5.jp/canvas/ref/method/closePath.html'
            },
            'lineTo': {
                type: ['num', 'num'],
                arg: ['x', 'y'],
                exp: 'ctx.lineTo(<span>x</span> : x座標, <span>y</span> : y座標);',
                exp1: '直線を描きます。具体的な使い方としては、moveTo()で始点を決めて次にlineTo()で座標(x, y)まで直線を描くといった使い方をします。もしサブパスが無ければ座標(x, y)に新規のサブパスを生成します。このメソッドは、三角形をmoveTo()とlineTo()で描画してみれば使い方のコツはつかめるでしょう。詳細URLのサンプルを参考にどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/lineTo.html'
            },
            'quadraticCurveTo': {
                type: ['num', 'num', 'num', 'num'],
                arg: ['cpx', 'cpy', 'x', 'y'],
                exp: 'ctx.quadraticCurveTo(<span>cpx</span> : 制御点x座標, <span>cpy</span> : 制御点y座標, <span>x</span> : x座標, <span>y</span> : y座標);',
                exp1: '二次ベジエ曲線を描きます。これは名前の通り曲がった線を描くためのものですね。曲線については制御点(cpx, xpy)によって線がどう曲がるかが決定します。細かい部分については、詳細URLで説明とサンプルを見てください。後は<a href="/firstcanvas/sample.html#quadraticCurveTo" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/quadraticCurveTo.html'
            },
            'bezierCurveTo': {
                type: ['num', 'num', 'num', 'num', 'num', 'num'],
                arg: ['cp1x', 'cp1y', 'cp2x', 'cp2y', 'x', 'y'],
                exp: 'ctx.bezierCurveTo(<span>cp1x</span> : 制御点1x座標, <span>cp1y</span> : 制御点1y座標, <span>cp2x</span> : 制御点2x座標, <span>cp2y</span> : 制御点2y座標, <span>x</span> : x座標, <span>y</span> : y座標);',
                exp1: '三次ベジエ曲線を描きます。quadraticCurveTo()よりも複雑な曲線が描けるメソッドで、正確に言うと制御点が1つ増えたということですね。引数が多いですが、第四引数まで制御点の座標というだけなので慣れれば難しくはありません。詳細URLでサンプル画像を見ながら考えてみたり、<a href="/firstcanvas/sample.html#bezierCurveTo" target="blank">補助サンプル</a>も参考になればどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/bezierCurveTo.html'
            },
            'arcTo': {
                type: ['num', 'num', 'num', 'num', 'num'],
                arg: ['x1', 'y1', 'x2', 'y2', 'radius'],
                exp: 'ctx.arcTo(<span>x1</span> : 1x座標, <span>y1</span> : y1座標, <span>x2</span> : x2座標, <span>y2</span> : y2座標, <span>radius</span> : 円の半径);',
                exp1: '円弧を描きます。arcTo()を正しく扱うには、arcTo()による円弧の描かれ方を理解する必要があります。大雑把に言えば、引数から2本の半直線(<span>x1</span>, <span>y1</span>, <span>x2</span>, <span>y2</span>)と半径(<span>dadius</span>)を指定し、2本の半直線に接する円を求めその接点を円周にそって結んだものが割り出される円弧となります。基本的には円でなく円弧(というか楕円)を描くためのメソッドですね。普通の円や扇形はarc()が向いていると思います。あとの細かい部分については詳細URLや<a href="/firstcanvas/sample.html#arcTo" target="blank">補助サンプル</a>を見てください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/arcTo.html'
            },
            'arc': {
                type: ['num', 'num', 'num', 'angle', 'angle', 'select'],
                arg: ['x', 'y', 'radius', 'sAngle', 'eAngle', ['false', 'true']],
                exp: 'ctx.arc(<span>x</span> : x座標, <span>y</span> : y座標, <span>radius</span> : 円の半径, <span>startAngle</span> : 始点角度, <span>endAngle</span> : 終点角度, <span>anticlockwise</span> :円弧の描画方向(true or false));',
                exp1: '円弧を描きます。座標(<span>x</span>, <span>y</span>)を中心とした半径(<span>radius</span>)の円を、<span>startAngle</span>を始点とし<span>endAngle</span>を終点に定め、<span>anticlockwise</span>によって時計周りに描くか反時計回りに描くかを指定します。円や扇形を描きたいときはarc()を使う場合が多いでしょうね。その他の情報は詳細URLや<a href="/firstcanvas/sample.html#arc" target="blank">補助サンプル</a>をどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/arc.html'
            },
            'rect':{
                type: ['num', 'num', 'num', 'num'],
                arg: ['x', 'y', 'w', 'h'],
                exp: 'ctx.rect(<span>x</span> : x座標, <span>y</span> : y座標, <span>w</span> : 横幅, <span>h</span> : 縦幅);',
                exp1: '矩形を描きます。長方形のことです。<span>w</span>と<span>h</span>はそれぞれ長方形の横と縦の長さです。このメソッドは新規にサブパスを生成し長方形を描いたらサブパスは閉じられます。なので、次に線や円弧を描画するときはmoveTo()など使って新しいサブパスを生成する必要がありますね。得に扱いが難しいわけではありませんが、詳細URLでサンプルも確認しておきましょう。',
                exp2: 'http://www.html5.jp/canvas/ref/method/rect.html'
            },
            'fill':{
                type: ['notype'],
                arg: [''],
                exp: 'ctx.fill( );',
                exp1: 'サブパスの内部を塗りつぶします。具体的には「△」を「▲」に描画したいならfill()を使います。塗りつぶしの色やスタイルはfillStyleで指定されたスタイルを使い、サブパスが閉じられていない場合(「∧」のようなとき）は、サブパスの終点から始点まで線を引きサブパスを閉じたことにして塗りつぶし(「∧」→「▲」)ます。この場合サブパスに影響はありません。その他詳しい情報は詳細URLなど参考にしてください。<a href="/firstcanvas/sample.html#fill" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/fill.html'
            },
            'stroke': {
                type: ['notype'],
                arg: [''],
                exp: 'ctx.stroke( );',
                exp1: 'サブパスを線で描画させます。描画にはstrokeStyleプロパティで定められたスタイルが利用されます。lineTo()やarc()など線や円を描くメソッドはありますが、これらのメソッドに色や輪郭を描画する機能はありません。そのうちの線を描画するためのメソッドがstroke()というわけです。この辺りは慣れていないと変な感じがするかもしれません。とりあえず、線や円の輪郭など描画させたい場合はstorke()を忘れないようにしときましょう。',
                exp2: 'http://www.html5.jp/canvas/ref/method/stroke.html'
            },
            'clip': {
                type: ['notype'],
                arg: [''],
                exp: 'ctx.clip( );',
                exp1: 'クリッピング領域を生成します。サブパスの図形に合わせてその内部に画像を表示させることを目的として利用されるメソッドですね。少しイメージし辛いですが、画像の一部分を四角とか円とか星型とか、そういった形にくり抜いて表示させることができます。手順はあらかじめくり抜くサブパスの図形を用意してからclip()を呼び出し、それから表示させる画像を当てはめます。あとは具体的なサンプルがある詳細URLを参考にしてください。<a href="/firstcanvas/sample.html#clip" target="blank">補助サンプル</a>も良かったらどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/clip.html'
            },
            'isPointInPath': {
                type: ['num', 'num'],
                arg: ['x', 'y'],
                exp: 'ctx.isPointInPath(<span>x</span> : x座標, <span>y</span> : y座標);',
                exp1: '座標(<span>x</span>, <span>y</span>)の地点が現在のサブパスの内部どうか調べます。内部であればtrue、外部であればfalseが返ってきます。その座標上に現在あるサブパス(線や円や矩形など)が描かれているかどうかを調べたいときに使いましょう。FirstCanvasではcodeパネルに値をconsole.log()で表示させている形になっています。その他のことについては詳細URLや<a href="/firstcanvas/sample.html#isPointInPath" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/isPointInPath.html'
            },
            'clearRect': {
                type: ['num', 'num', 'num', 'num'],
                arg: ['x', 'y', 'w', 'y'],
                exp: 'ctx.clearRect(<span>x</span> : x座標, <span>y</span> : y座標, <span>w</span> : 横幅, <span>h</span> : 縦幅);',
                exp1: '透明な黒の矩形を描画します。透明な黒の矩形というのはつまり白色として扱って良いと思います。よくある使い方としては、canvasに描画された線や図形をクリアするときに使われます。パスに影響を与えること無く扱うことができるのでbeginPath()を呼び出す必要はありません。またfill()やfillStyleなどの影響もなく、ただ指定された座標に指定さた大きさの白い矩形を描画するメソッドです。',
                exp2: 'http://www.html5.jp/canvas/ref/method/clearRect.html'
            },
            'fillRect': {
                type: ['num', 'num', 'num', 'num'],
                arg: ['x', 'y', 'w', 'y'],
                exp: 'ctx.fillRect(<span>x</span> : x座標, <span>y</span> : y座標, <span>w</span> : 横幅, <span>h</span> : 縦幅);',
                exp1: 'あらかじめ塗りつぶされた矩形を描画します。塗りつぶしの色はfillStyleを用いて塗りつぶします。パスのrect()とfill()で同じことができますが、fillRect()は今あるパスには影響を与えません。またパスの操作をするstroke()やfill()による描画の影響もありません。単純に内部を塗りつぶした矩形を扱いたいときに気楽に利用できるメソッドです。',
                exp2: 'http://www.html5.jp/canvas/ref/method/clearRect.html'
            },
            'strokeRect': {
                type: ['num', 'num', 'num', 'num'],
                arg: ['x', 'y', 'w', 'y'],
                exp: 'ctx.strokeRect(<span>x</span> : x座標, <span>y</span> : y座標, <span>w</span> : 横幅, <span>h</span> : 縦幅);',
                exp1: '矩形の輪郭をあらかじめ線で描いて描画させます。線はstrokeStyleやlineWidthなどを用いて描かれます。パスのrect()とstroke()で同じことはできますが、strokeRect()は今あるパスには影響を与えません。またパスの操作をするstroke()やfill()による描画の影響もありません。単純に輪郭が描かれた矩形を描画したいときに気楽に利用できるメソッドです。',
                exp2: 'http://www.html5.jp/canvas/ref/method/clearRect.html'
            },
            'addColorStop':{
                type: ['gradient', 'num', 'color'],
                arg: ['none', 'offset', 'color'],
                exp: 'gradient.addColorStop(<span>offset</span> : 色を配置する相対位置, <span>color</span> : 配置する色);',
                exp1: 'CanvasGrandientオブジェクトのメソッドで、グラデーションの色とその位置を定義します。<span>offset</span>は0.0～1.0の間の数値を指定。それ以下か以上の数値はエラーが発生しますが、FirstCanvasでは既定外の値は調整します。このaddColorStop()を何度か呼び出して色を重ねながらグラデーションさせ、利用するときはfillStyleプロパティにCanvasGrandientオブジェクトをセットします。もう少し詳しい話は詳細URLや<a href="/firstcanvas/sample.html#addColorStop" target="blank">補助サンプル</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/addColorStop.html'
            },
            'createLinearGradient':{
                type: ['num', 'num', 'num', 'num'],
                arg: ['x0', 'y0', 'x1', 'y1'],
                exp: 'gradient = ctx.createLinearGradient(<span>x0</span> : x0座標, <span>y0</span> : y0座標, <span>x1</span> : x1座標, <span>y1</span> : y1座標);',
                exp1: '線形グラデーションのCanvasGradientオブジェクトを返すメソッドです。座標(<span>x0</span>, <span>y0</span>)の始点から、座標(<span>x1</span>, <span>y1</span>)の終点にかけて直線的なグラデーションがかかります。グラデーションの色をつけるにはオブジェクトに組み込まれているaddColorStop()を使います。詳しくは詳細URLや<a href="/firstcanvas/sample.html#createLinearGradient" target="blank">補助サンプル</a>でどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/createLinearGradient.html'
            },
            'createRadialGradient':{
                type: ['num', 'num', 'num', 'num', 'num', 'num'],
                arg: ['x0', 'y0', 'r0', 'x1', 'y1', 'r1'],
                exp: 'gradient = ctx.createRadialGradient(<span>x0</span> : x0座標, <span>y0</span> : y0座標, <span>r0</span> : 開始円の半径, <span>x1</span> : x1座標, <span>y1</span> : y1座標, <span>r1</span> : 終了円の半径);',
                exp1: '円形グラデーションのCanvasGradientオブジェクトを返すメソッドです。座標(<span>x0</span>, <span>y0</span>)を中心にした半径（<span>r0</span>）の開始円から、座標( <span>x1</span>, <span>y1</span>)を中心にした半径（<span>r1</span>）の終了円にかけてグラデーションがかかります。グラデーションの色をつけるにはオブジェクトに組み込まれているaddColorStop()を使います。詳しくは詳細URLや<a href="/firstcanvas/sample.html#createRadialGradient" target="blank">補助サンプル</a>でどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/createRadialGradient.html'
            },
            'createPattern':{
                type: ['ptnimage', 'select'],
                arg: [['ptnimg01.gif', 'ptnimg02.gif'], ['repeat', 'repeat-x', 'repeat-y', 'no-repeat']],
                exp: 'pattern = ctx.createPattern(<span>image</span> : 繰り返しに使う画像, <span>repetition</span> : 繰り返しのタイプ);',
                exp1: '画像を指定の繰り返しで使うCanvasPatternオブジェクトを返すメソッドです。画像をリピートさせたいときに使います。<span>image</span>にはcanvasのイメージやvideoなども使えますが、FirstCanvasでは指定の画像のみ対応。FileAPIが利用できるブラウザではローカルの画像も使えます。メソッドの具体的な使い方はcodeパネルを参考にしてください。少し特殊です。その他詳しくは詳細URLや<a href="/firstcanvas/sample.html#createPattern" target="blank">補助サンプル</a>をどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/createPattern.html'
            },
            'save': {
                type: ['notype'],
                arg: [''],
                exp: 'ctx.save();',
                exp1: '現在の描画状態を保存するメソッドです。描画状態とは現在の変換マトリックス、クリップ領域、strokeStyleやfillStyleなどプロパティの値のことで、それらをスタックに追加します。パスや描画されている三角形や円形などは保存されませんが、線の太さとか塗りつぶしの色は保存してくれるということですね。取り出すときはrestore()で復元します。その他詳しくは詳細URLで確認してください。<a href="/firstcanvas/sample.html#save" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/save.html'
            },
            'restore': {
                type: ['notype'],
                arg: [''],
                exp: 'ctx.restore();',
                exp1: 'save()で保存された描画状態を復元するメソッドです。save()によって保存されている描画状態がある限りスタックの最後から取り出し今のcanvasに反映させます。復元されるのは描画状態であってパスや描画そのものは復元されません。save()を呼び出して状態を保存したことがなければ利用しないメソッドですね。詳しい内容は詳細URLで確認してください。<a href="/firstcanvas/sample.html#save" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/save.html'
            },
            'scale': {
                type: ['num', 'num'],
                arg: ['x', 'y'],
                exp: 'ctx.scale(<span>x</span> : x軸方向への伸縮, <span>y</span> : y軸方向への伸縮);',
                exp1: '伸縮変形を行うメソッドです。描画させる図形の拡大や縮小を目的として利用します。メソッドが呼び出される以前の描画内容については影響しません。引数は倍数で指定し、例えば矩形を2倍の大きさにするときはctx.scale(2, 2);とします。伸縮の対象は図形そのものというよりはcanvasのようです。このあたりの確認も含めていじってみてください。あとは詳細URLや<a href="/firstcanvas/sample.html#scale" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/scale.html'
            },
            'rotate': {
                type: ['angle'],
                arg: ['angle'],
                exp: 'ctx.rotate(<span>angle</span> : 回転角度(ラジアン));',
                exp1: '回転変形を行うメソッドです。描画する図形を回転させるために使ったりします。メソッドが呼び出される以前の描画そのものに影響ありません。<span>angle</span>は回転の角度をラジアンで表したもので時計周りですね。回転する対象は図形そのものというよりはcanvasのようです。最初のうちは度数を小さめで試してみると理解しやすいと思います。その他詳しくは詳細URLや<a href="/firstcanvas/sample.html#rotate" target="blank">補助サンプル</a>もどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/rotate.html'
            },
            'translate': {
                type: ['num', 'num'],
                arg: ['x', 'y'],
                exp: 'ctx.translate(<span>x</span> : x軸方向へ移動する距離, <span>y</span> : y軸方向へ移動する距離);',
                exp1: '移動変形を行うメソッドです。描画する図形を移動させるために使ったりします。メソッドが呼び出される以前の描画そのものに影響はありません。引数にはそれぞれ移動する座標空間の単位（moveTo()などで使う数値と同じ）です。移動するのは図形そのものというよりは、canvasの基準線となる座標(0, 0)がtranslate()で指定した座標に移動することになります。細かい部分やサンプルは詳細URLや<a href="/firstcanvas/sample.html#translate" target="blank">補助サンプル</a>をどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/translate.html'
            },
            'transform': {
                type: ['num', 'num', 'num', 'num', 'num', 'num'],
                arg: ['m11', 'm12', 'm21', 'm22', 'dx', 'dy'],
                exp: 'ctx.transform(<span>m11</span>, <span>m12</span>, <span>m21</span>, <span>m22</span>, <span>dx</span>, <span>dy</span>);（引数の詳細は<a href="/firstcanvas/sample.html#transform" target="blank">補助サンプル</a>を見てください）',
                exp1: '変換マトリックスを適用させます。このメソッドは簡単に言えばscale()、rotate()、translate()の3つを合わせたようなメソッドですが、transform()を使えば複雑な変換マトリックスがそれら3つで行うより扱いやすくなります。図形の伸縮、回転、移動をこのメソッドで多彩に行うことができるわけですね。難しいメソッドだと思うので詳しくは詳細URLと<a href="/firstcanvas/sample.html#transform" target="blank">補助サンプル</a>を見てください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/transform.html'
            },
            'setTransform': {
                type: ['num', 'num', 'num', 'num', 'num', 'num'],
                arg: ['m11', 'm12', 'm21', 'm22', 'dx', 'dy'],
                exp: 'ctx.setTransform(<span>m11</span>, <span>m12</span>, <span>m21</span>, <span>m22</span>, <span>dx</span>, <span>dy</span>);',
                exp1: 'transform()とほぼ同じ機能を持つメソッドです。ただし、setTransform()は今までの変換マトリックスをリセットして引数で指定したマトリックスを新しく適用させます。今までの変換マトリックスを引き続き利用するならtransform()を使い、リセットして新しい変換マトリックスを適用させるならsetTransform()を使います。その他詳しくはtransform()を見てください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/setTransform.html'
            },
            'createImageData':{
                type: ['notype', 'notype'],
                arg: ['sw', 'sh'],
                exp: 'imagedata = ctx.createImageData(<span>sw</span> : 横幅, <span>sh</span> : 縦幅);',
                exp1: 'imagedataオブジェクトを生成します。<span>sw</span>が横幅で<span>sh</span>を縦幅とする透明な黒で塗りつぶされた矩形を返します。またctx.createImageData(imagedata);とすれば同じ寸法の新しいImageDataオブジェクトを返します。これはピクセル単位(例えば座標(1,1)の地点が最小のピクセル単位に当たる)で色を操作したいときに使うことが多いですね。FirstCanvasではその操作が少し複雑なため利用できませんが、<a href="/firstcanvas/sample.html#createImageData" target="blank">補助サンプル</a>で大まかに理解しておきましょう。',
                exp2: 'http://www.html5.jp/canvas/ref/method/getImageData.html'
            },
            'getImageData': {
                type: ['num', 'num', 'num', 'num'],
                arg: ['sx', 'sy', 'sw', 'sh'],
                exp: 'imagedata = ctx.getImageData(<span>sx</span> : x座標, <span>sy</span> : y座標, <span>sw</span> : 横幅, <span>sh</span> : 縦幅)',
                exp1: 'canvasに描画されている内容をImageDataオブジェクトとして取得します。座標(<span>sx</span>, <span>sy</span>)を左上頂点とし横幅が<span>sw</span>で縦幅が<span>sh</span>の大きさとなる矩形で取得します。描画されている一部分をコピーして別の場所に貼り付けたり、それをピクセル単位で色のデータを操作するといった目的で使われますね。使い方については詳細URLを読んでください。色のデータの操作は<a href="/firstcanvas/sample.html#createImageData" target="blank">ImageDataオブジェクトの項目</a>をどうぞ。',
                exp2: 'http://www.html5.jp/canvas/ref/method/getImageData.html'
            },
            'putImageData1': {
                type: ['imagedata', 'num', 'num'],
                arg: ['none', 'dx', 'dy'],
                exp: 'ctx.putImageData(<span>imagedata</span> : ImageDataオブジェクト, <span>dx</span> : x座標, <span>dy</span> : y座標);',
                exp1: 'ImageDataオブジェクトのデータを描画します。引数には描画するImageDataオブジェクトを指定し、座標(<span>dx</span>, <span>dy</span>)の地点を左上として描画することになります。ImageDataオブジェクトを得るにはcreateImageData()又はgetImageData()を使いますが、FirstCanvasではcreateImageData()を扱えないのでご了承ください。その他詳細はURL先やは<a href="/firstcanvas/sample.html#putImageData" target="blank">補助サンプル</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/getImageData.html'
            },
            'putImageData2': {
                type: ['imagedata', 'num', 'num', 'num', 'num', 'num', 'num'],
                arg: ['none', 'dx', 'dy', 'dirtyX', 'dirtyY', 'dirtyW', 'dirtyH'],
                exp: 'ctx.putImageData(<span>imagedata</span> : ImageDataオブジェクト, <span>dx</span> : x座標, <span>dy</span> : y座標, <span>dirtyX</span> : ImageDataのx座標, <span>dirtyY</span> : ImageDataのy座標, <span>dirtyWidth</span> : 描画する横幅, <span>dirtyHeight</span> : 描画する縦幅);',
                exp1: 'ImageDataオブジェクトのデータのうち、dirty矩形のピクセルだけ描画します。dirty矩形の範囲外のピクセルは何も描画されません。dirty矩形に対応していないブラウザはputImageData1()の引数で描画されます。その他詳細はURL先や<a href="/firstcanvas/sample.html#putImageData" target="blank">補助サンプル</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/getImageData.html'
            },
            'ImageDataProperties': {
                type: ['imagedata', 'select'],
                arg: ['none', ['width', 'height', 'data']],
                exp: '<span>imagedata.width</span> : 横幅; <span>imagedata.height</span> : 縦幅; <span>imagedata.data</span> : 1次元配列の色データ;',
                exp1: 'ImageDataオブジェクトのプロパティです。ImageDataオブジェクトとはcreateImageData()やgetImageData()で取得できる矩形の画像データのオブジェクトです。そのオブジェクトの横幅や縦幅や色データを取得できるのがwidth、height、dataですね。詳しくはURL先や<a href="/firstcanvas/sample.html#createImageData" target="blank">ImageDataオブジェクトの項目</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/getImageData.html'
            },
            'drawImage1': {
                type: ['drawimage', 'num', 'num'],
                arg: [['dimg01.jpg', 'dimg02.jpg', 'dimg03.jpg'], 'dx', 'dy'],
                exp: 'ctx.drawImage(<span>image</span> : 画像, <span>dx</span> : x座標, <span>dy</span> : y座標);',
                exp1: '指定の画像を描画します。<span>image</span>には画像の他にCanvasElementやvideoを指定し、座標(<span>dx</span>, <span>dy</span>)の地点を左上として描画することになりますがFirstCanvasでは指定の画像のみ対応。FileAPIが利用できるプラウザではローカルの画像も使えます。このあたりの詳しい話はURL先や<a href="/firstcanvas/sample.html#drawImage" target="blank">補助サンプル</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/drawImage.html'
            },
            'drawImage2': {
                type: ['drawimage', 'num', 'num', 'num', 'num'],
                arg: [['dimg01.jpg', 'dimg02.jpg', 'dimg03.jpg'], 'dx', 'dy', 'dw', 'dh'],
                exp: 'ctx.drawImage(<span>image</span> : 画像, <span>dx</span> : x座標, <span>dy</span> : y座標, <span>dw</span> : 横幅, <span>dy</span> : 縦幅);',
                exp1: '画像を伸縮させて描画するdrawImage()での画像の描画を行います。左の項目ではdrawImage2()とありますが、識別しやすいよう数字を入れただけで正しくはdrawImage()です。詳しくはURL先や<a href="/firstcanvas/sample.html#drawImage" target="blank">補助サンプル</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/drawImage.html'
            },
            'drawImage3': {
                type: ['drawimage', 'num', 'num', 'num', 'num', 'num', 'num', 'num', 'num'],
                arg: [['dimg01.jpg', 'dimg02.jpg', 'dimg03.jpg'], 'sx', 'sy', 'sw', 'sh', 'dx', 'dy', 'dw', 'dh'],
                exp: 'ctx.drawImage(<span>image</span> : 画像, <span>sx</span> : 画像のx座標, <span>sy</span> : 画像のy座標, <span>sw</span> : 画像の横幅, <span>dy</span> : 画像の縦幅, <span>dx</span> : x座標, <span>dy</span> : y座標, <span>dw</span> : 横幅, <span>dy</span> : 縦幅);',
                exp1: '画像をトリミング（画像の一部を切り取る）して切り取った部分を伸縮させて描画する、drawImage()での画像の描画を行います。左の項目ではdrawImage3()とありますが、識別しやすいよう数字を入れただけで正しくはdrawImage()です。詳しくはURL先や<a href="/firstcanvas/sample.html#drawImage" target="blank">補助サンプル</a>で確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/drawImage.html'
            },
            'fillText': {
                type: ['str', 'num', 'num'],
                arg: ['text', 'x', 'y'],
                exp: 'ctx.fillText(<span>text</span> : 描画させるテキスト, <span>x</span> : x座標, <span>y</span> : y座標 [, <span>maxWidth</span>]);',
                exp1: '塗りつぶした文字を描画します。描画する際にはfont, textAlign, textBaselineプロパティが適用されます。<span>maxWidth</span>はテキストの幅を制限することができますが、firstCanvasでは現在のところ省いていますので指定できません。実際に使う場合は利用できるので覚えておいてください。特に扱う上で難しいことはありませんが、細かい仕様は詳細URLで確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/fillText.html'
            },
            'strokeText': {
                type: ['str', 'num', 'num'],
                arg: ['text', 'x', 'y'],
                exp: 'ctx.strokeText(<span>text</span> : 描画させるテキスト, <span>x</span> : x座標, <span>y</span> : y座標 [, <span>maxWidth</span>]);',
                exp1: '縁取りをした文字を描画します。描画する際にはfont, textAlign, textBaselineプロパティが適用されます。<span>maxWidth</span>はテキストの幅を制限することができますが、firstCanvasでは現在のところ省いていますので指定できません。実際に使う場合は利用できるので覚えておいてください。特に扱う上で難しいことはありませんが、細かい仕様は詳細URLで確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/fillText.html'
            },
            'measureText': {
                type: ['str'],
                arg: ['text'],
                exp: 'metrics = ctx.measureText(<span>text</span> : テキスト);',
                exp1: '指定のテキストの長さを持つTextMetricsオブジェクト生成します。長さというか幅ですね。canvasに描画したときに、そのテキストの全体的な幅はいくつになるのか調べるときに使います。幅の数値を取得するにはmetrics.widthとTextMetricsオブジェクトのwidthプロパティから得ます。FirstCanvasではwidthプロパティをconsole.log()で表示するところまで行っていますが、具体的な使い方は詳細URL先のサンプルを確認してみてください。',
                exp2: 'http://www.html5.jp/canvas/ref/method/measureText.html'
            },
            'drawFocusRing': {
                type: ['notype', 'notype', 'notype'],
                arg: ['element', 'x', 'y'],
                exp: 'ctx.drawFocusRing(<span>element</span> : htmlの要素, <span>x</span> : x座標, <span>y</span> : y座標 [, <span>canDrawCustom</span>]);',
                exp1: 'このメソッドはどのブラウザでも実装が不十分のためFirstCanvasでは現在のところ利用できません。詳細URLのサンプルは唯一Google Chrome6以降でなんかやってるなというのが分かる程度です。',
                exp2: 'http://www.html5.jp/canvas/ref/method/drawFocusRing.html'
            },
            'strokeStyle': {
                type: ['colorplus'],
                arg: ['value'],
                exp: 'ctx.strokeStyle = <span>value</span> : 線のスタイル;',
                exp1: '現在の輪郭のスタイルを設定します。輪郭というか線ですね。サブパスにstroke()で線を描画したりstrokeRect()を呼び出したときの輪郭のスタイルを変更できます。<span>value</span>にはCSSカラーを含んだ文字列か、CanvasGradientやCanvasPatternオブジェクトが指定できますが、FirstCanvasではそのうちCSSカラーとCanvasGradientオブジェクトが利用できます。',
                exp2: 'http://www.html5.jp/canvas/ref/property/strokeStyle.html'
            },
            'fillStyle': {
                type: ['colorplus'],
                arg: ['value'],
                exp: 'ctx.fillStyle = <span>value</span> : 塗りつぶしに使うスタイル;',
                exp1: '現在の塗りつぶしのスタイルを設定します。fill()でサブパスを塗りつぶしたりfillRect()を呼び出したときの内側の塗りつぶしのスタイルを変更できます。<span>value</span>にはCSSカラーを含んだ文字列か、CanvasGradientやCanvasPatternオブジェクトが指定できますが、FirstCanvasではそのうちCSSカラーとCanvasGradientオブジェクトが利用できます。その他細かい部分やサンプルは詳細URLで確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/property/fillStyle.html'
            },
            'globalAlpha': {
                type: ['num'],
                arg: ['value'],
                exp: 'ctx.globalAlpha = <span>value</span> : アルファ値;',
                exp1: '現在のcanvasに描画される線や図形や画像のアルファ値を設定します。アルファ値というのは透過度のことで<span>value</span>には0.0～1.0の間の数値を指定。0.0に近づくほど透明で1.0に近づくほど不透明となりますね。初期値は1.0なので最初は不透明な状態です。範囲外の値や認められない文字をセットしても何も変わりません。FirstCanvasでは0.0以下や1.0以上の値は調節しています。',
                exp2: 'http://www.html5.jp/canvas/ref/property/globalAlpha.html'                
            },
            'globalCompositeOperation': {
                type: ['select'],
                arg: [['source-atop', 'source-in', 'source-out', 'source-over', 'destination-atop', 'destination-in', 'destination-out', 'destination-over', 'lighter', 'copy', 'xor']],
                exp: 'ctx.globalCompositeOperation = <span>value</span> : 合成処理のタイプ;',
                exp1: '現在の描画内容の合成処理を設定します。言葉にすると難しく感じるかもしれませんが、線や図形や画像などが重なったときにどう描画するのかを決めることができるプロパティですね。既定外の文字をセットした場合は無視されます。それぞれの文字を設定することによってどう描画されるのかは詳細URLを見てください。見ながらいじって試しているとだいたい分かるでしょう。',
                exp2: 'http://www.html5.jp/canvas/ref/property/globalCompositeOperation.html'                
            },
            'lineWidth': {
                type: ['num'],
                arg: ['value'],
                exp: 'ctx.lineWidth = <span>value</span> : 線の幅;',
                exp1: '現在の線の幅を設定します。これはそのままの意味ですね。lineTo()やstrokeRect()などで描画される線の幅を設定できます。最小値は1.0でこれは初期状態の値と同じです。また0や既定外の値は無視されます。分かりやすいプロパティだとは思いますが、分からなければ詳細URLのサンプルを見てください。',
                exp2: 'http://www.html5.jp/canvas/ref/property/lineWidth.html'                
            },
            'lineCap': {
                type: ['select'],
                arg: [['butt', 'round', 'square']],
                exp: 'ctx.lineCap = <span>value</span> : 線の両端のスタイル;',
                exp1: '現在の線の始端と終端のスタイルを設定します。lineTo()やarcTo()などの線の始端と終端をどういった形にするかってものですね。それぞれの文字を選ぶことでどういうスタイルになるかは詳細URLの画像をご覧になってください。',
                exp2: 'http://www.html5.jp/canvas/ref/property/lineCap.html'                
            },
            'lineJoin': {
                type: ['select'],
                arg: [['bevel', 'round', 'miter']],
                exp: 'ctx.lineJoin = <span>value</span> : 線の接続のスタイル;',
                exp1: '現在の線と線が接する角のスタイルを設定します。たとえばlineTo()によって三角形を描いたとすると3つの角ができますね。その角をどういう形にするのかを設定するのがlineJoinプロパティです。尖った形にしたり丸くしたりできるわけですね。初期状態では尖っている"miter"となっています。あとは図を見ると理解しやすいと思うので詳細URLを見てください。画像のサンプルがあります。',
                exp2: 'http://www.html5.jp/canvas/ref/property/lineJoin.html'
            },
            'miterLimit': {
                type: ['num'],
                arg: ['value'],
                exp: 'ctx.miterLimit = <span>value</span> : ;',
                exp1: '現在のmiter限界比率を設定します。これはlineJoinプロパティがmiterのときに線と線の接する角をどう描画させるかを設定するものですね。miterは角が尖ったスタイルで、この尖っている部分を操作します。初期値は10.0で0以下や既定外の文字は無視されます。これは詳細URLの図で確認すると分かりやすいと思いますよ。',
                exp2: 'http://www.html5.jp/canvas/ref/property/miterLimit.html'                
            },
            'shadowColor': {
                type: ['colorplus'],
                arg: ['value'],
                exp: 'ctx.shadowColor = <span>value</span> : 影の色;',
                exp1: '現在の影の色を設定します。影とはcanvasに描画される線や図形や画像の影のことでその影の色を設定するものですね。ただし色を設定しただけでは影のように描画されません。ShadowOffsetXやshadowOffsetYで影の位置を設定したり、shadowBlurで影のぼかし具合を設定して調整したりします。',
                exp2: 'http://www.html5.jp/canvas/ref/property/shadowColor.html'
            },
            'shadowOffsetX': {
                type: ['num'],
                arg: ['value'],
                exp: 'ctx.shadowOffsetX = <span>value</span> : x軸方向の影の位置;',
                exp1: '現在のx軸方向の影の位置を設定します。影とはcanvasに描画される線や図形や画像の影のことで、その影のうち水平方向での位置を設定します。詳細URLの画像を見ると分かりやすいと思うのでのぞいてみて下さい。0が初期値で数値以外の値をセットした場合は無視されます。',
                exp2: 'http://www.html5.jp/canvas/ref/property/shadowOffsetX.html'
            },
            'shadowOffsetY': {
                type: ['num'],
                arg: ['value'],
                exp: 'ctx.shadowOffsetY = <span>value</span> : y軸方向の影の位置;',
                exp1: '現在のy軸方向の影の位置を設定します。影とはcanvasに描画される線や図形や画像の影のことで、その影のうち垂直方向での位置を設定します。詳細URLの画像を見ると分かりやすいと思うのでのぞいてみて下さい。0が初期値で数値以外の値をセットした場合は無視されます。',
                exp2: 'http://www.html5.jp/canvas/ref/property/shadowOffsetY.html' 
            },
            'shadowBlur': {
                type: ['num'],
                arg: ['value'],
                exp: 'ctx.shadowBlur = <span>value</span> : 影のぼかし度;',
                exp1: '影のぼかし度合いを設定します。数値が大きいほどぼかしも強くなります。初期値は0で、マイナスや既定外の値は無視されます。どのようにぼかしが効くかについては詳細URLの画像を参考にしてください。',
                exp2: 'http://www.html5.jp/canvas/ref/property/shadowBlur.html' 
            },
            'font': {
                type: ['str'],
                arg: ['value'],
                exp: 'ctx.font = <span>value</span> : フォント名;',
                exp1: '現在のフォントを設定します。fillText()やstrokeText()でテキストを描画させるときのフォントやその大きさを決めることができます。フォント名はCSSで記述する方法と同じで、ウェブフォントも利用できますね。また、既定外の文字をセットした場合は無視されます。慣れていないとどうフォント名を書けば良いかわからないと思うので詳細URLを参考にしてください。',
                exp2: 'http://www.html5.jp/canvas/ref/property/font.html'                
            },
            'textAlign': {
                type: ['select'],
                arg: [['start', 'end', 'left', 'right', 'center']],
                exp: 'ctx.textAlign = <span>value</span> : テキストの水平位置の種類;',
                exp1: '現在のテキストの水平位置を設定します。fillText()やstrokeText()でテキストを描画させるとき指定した座標からの水平位置を決めることができます。左寄せにしたり右寄せにしたり、中央に寄せたいなと思ったときにtextAlignを使いますね。初期値はstartで決められた値以外をセットした場合無視されます。それぞれの値の効果については詳細URLで確認してください。',
                exp2: 'http://www.html5.jp/canvas/ref/property/textAlign.html'
            },
            'textBaseline': {
                type: ['select'],
                arg: [['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom']],
                exp: 'ctx.textBaseline = <span>value</span> : テキストの垂直位置の種類;',
                exp1: '現在のテキストの垂直位置を設定します。fillText()やstrokeText()でテキストを描画させるとき指定した座標からの垂直位置を決めることができます。それぞれの値をセットした場合どう配置されるかは詳細URLをみてください。初期値はalphabeticで既定外の値をセットした場合は無視されます。',
                exp2: 'http://www.html5.jp/canvas/ref/property/textBaseline.html'
            }
        };

        for(var m in member) {
            member[m].exp = '<strong>【構文】</strong>' + member[m].exp + '<br /><strong>【解説】</strong>' + member[m].exp1 + '<br /><strong>【詳細】</strong><a href="' + member[m].exp2 + '" target="blank">' + member[m].exp2 + '</a>';
            delete member[m].exp1;
            delete member[m].exp2;
        }
        return function(t) {this.data = member[t] || {};};
    })();

    // 内部

    Rc.prototype.tryCatch = function(arg) {
        try {
            this[this.name](ctx, arg);
            this.completeMsg();
            this.pushStack(this.name, arg);
        } catch (e){
            this.errorMsg('Erorr!');
        }
    };

    Rc.prototype.trimOfParens = function(txt) {
        if(/\(\)/.test(txt)) {
            this.nameType = 'mtd';
            return txt.replace('()', '');
        } else {
            this.nameType = 'prop';
            return txt;
        }
    };

    Rc.prototype.trimOfNameNumber = function(name) {
        if(/\d/.test(name)) {
            return name.replace(/\d/g, '');
        }
        return name;
    };    
    
    Rc.prototype.decrementCount = function(name) {
        var n = this.toCountName(name);
        if(n in this.count) this.count[n] -= 1;
    };       

    Rc.prototype.clearCount = function() {
        for(var name in this.count) {
            this.count[name] = 0;
        }
    };

    Rc.prototype.getCount = function(name) {
        var n = this.toCountName(name);
        return this.count[n];
    };

    Rc.prototype.incrementCount = function(name) {
        if(!this.stopper) {
        var n = this.toCountName(name);
            this.count[n] += 1;
        }
    };

    Rc.prototype.toCountName = function(name) {
        var n;
        if(name === 'createLinearGradient' ||
           name === 'createRadialGradient') {
            n = 'gradient';
            return n;
        } else if(/drawImage/.test(name)) {
            n = 'drawImage';
            return n;
        }
        return name;
    };

    Rc.prototype.formInit = function() { //　内容を初期化
        if(this.data.type.nodeType === 1) {
            var i = 0, arg = this.data.arg, l = arg.length;
            for(; i < l; i++) {
                if(arg[i].nodeName === 'INPUT') {
                    arg[i].value = arg[i].getAttribute('value');
                    if(!arg[i].className.split(' ')[1]) {
                        arg[i].className += ' inputBlur';
                    }
                } else if(arg[i].nodeName === 'SELECT') {
                    if(!arg[i][0].selected) arg[i][0].selected = true;
                }
            }
        }
    };

    Rc.prototype.insertPanelCode = function(/* 可変 */) {
        var area, v;
        if(!this.stopper) { // undoでの挿入を制御
            var li = doc.createElement('li'),
            l = arguments.length;
            li.appendChild(doc.createTextNode(arguments[0]));

            // さらに挿入する場合
            if(l > 1) {
                var i = 1; l = arguments.length;
                for(; i < l; i++) {
                    li.appendChild(doc.createElement('br'));
                    li.appendChild(doc.createTextNode(arguments[i]));                    
                }
            }
            area = elems.codeTxtArea;
            area.appendChild(li);
            
            // 下までスクロール
            v = area.scrollHeight - area.clientHeight;
            if(v) area.scrollTop = v;
        }            
    };
    
    Rc.prototype.isNum = function(n, propval, blur) { // 簡易数値チェック
        if(n === propval && blur) {
            this.insertMsg(this.name + 'の "' + propval + '" が未入力です');
            return false;
        }

        n = +n;
        if(isFinite(n)) {
            return true;
        } else {
            this.insertMsg(this.name + 'の "' + propval + '" は数値を入力してください');
            return false;
        }
    };

    Rc.prototype.isColor = function(s, propval, blur) { // 簡易カラーチェック 色での問題はここをチェック。
        if(s === propval && blur) {
            this.insertMsg(this.name + 'の "' + propval  + '" が未入力です');
            return false;
        }

        if(this.checkColor(s)) {
            return true;
        }

        if(/^\#[a-fA-F0-9]{3}$/.test(s) ||
           /^\#[a-fA-F0-9]{6}$/.test(s)) {
            return true;            
        }

        if(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(s) ||
           /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\)$|(?=\.\d+\)$))|1(\)$|(?=\.0\)$)))/.test(s)) {
            s = s.replace(/[rgba\(\)\s]/g, '').split(',');

            for(var i = 0; i < s.length; i++) {
                if([i] < 0 || s[i] > 255) {
                    this.insertMsg(this.name + 'の "' + propval  + '" は指定の形式で入力してください');
                    return false;
                }   
            }
            return true;
        }
        this.insertMsg(this.name + 'の "' + propval  + '" は指定の形式で入力してください');
        return false;       
    };

    Rc.prototype.checkColor = (function() {
        var c = {
            aliceblue: 'f0f8ff',
            antiquewhite: 'faebd7',
            aqua: '00ffff',
            aquamarine: '7fffd4',
            azure: 'f0ffff',
            beige: 'f5f5dc',
            bisque: 'ffe4c4',
            black: '000000',
            blanchedalmond: 'ffebcd',
            blue: '0000ff',
            blueviolet: '8a2be2',
            brown: 'a52a2a',
            burlywood: 'deb887',
            cadetblue: '5f9ea0',
            chartreuse: '7fff00',
            chocolate: 'd2691e',
            coral: 'ff7f50',
            cornflowerblue: '6495ed',
            cornsilk: 'fff8dc',
            crimson: 'dc143c',
            cyan: '00ffff',
            darkblue: '00008b',
            darkcyan: '008b8b',
            darkgoldenrod: 'b8860b',
            darkgray: 'a9a9a9',
            darkgreen: '006400',
            darkkhaki: 'bdb76b',
            darkmagenta: '8b008b',
            darkolivegreen: '556b2f',
            darkorange: 'ff8c00',
            darkorchid: '9932cc',
            darkred: '8b0000',
            darksalmon: 'e9967a',
            darkseagreen: '8fbc8f',
            darkslateblue: '483d8b',
            darkslategray: '2f4f4f',
            darkturquoise: '00ced1',
            darkviolet: '9400d3',
            deeppink: 'ff1493',
            deepskyblue: '00bfff',
            dimgray: '696969',
            dodgerblue: '1e90ff',
            feldspar: 'd19275',
            firebrick: 'b22222',
            floralwhite: 'fffaf0',
            forestgreen: '228b22',
            fuchsia: 'ff00ff',
            gainsboro: 'dcdcdc',
            ghostwhite: 'f8f8ff',
            gold: 'ffd700',
            goldenrod: 'daa520',
            gray: '808080',
            green: '008000',
            greenyellow: 'adff2f',
            honeydew: 'f0fff0',
            hotpink: 'ff69b4',
            indianred : 'cd5c5c',
            indigo : '4b0082',
            ivory: 'fffff0',
            khaki: 'f0e68c',
            lavender: 'e6e6fa',
            lavenderblush: 'fff0f5',
            lawngreen: '7cfc00',
            lemonchiffon: 'fffacd',
            lightblue: 'add8e6',
            lightcoral: 'f08080',
            lightcyan: 'e0ffff',
            lightgoldenrodyellow: 'fafad2',
            lightgrey: 'd3d3d3',
            lightgreen: '90ee90',
            lightpink: 'ffb6c1',
            lightsalmon: 'ffa07a',
            lightseagreen: '20b2aa',
            lightskyblue: '87cefa',
            lightslateblue: '8470ff',
            lightslategray: '778899',
            lightsteelblue: 'b0c4de',
            lightyellow: 'ffffe0',
            lime: '00ff00',
            limegreen: '32cd32',
            linen: 'faf0e6',
            magenta: 'ff00ff',
            maroon: '800000',
            mediumaquamarine: '66cdaa',
            mediumblue: '0000cd',
            mediumorchid: 'ba55d3',
            mediumpurple: '9370d8',
            mediumseagreen: '3cb371',
            mediumslateblue: '7b68ee',
            mediumspringgreen: '00fa9a',
            mediumturquoise: '48d1cc',
            mediumvioletred: 'c71585',
            midnightblue: '191970',
            mintcream: 'f5fffa',
            mistyrose: 'ffe4e1',
            moccasin: 'ffe4b5',
            navajowhite: 'ffdead',
            navy: '000080',
            oldlace: 'fdf5e6',
            olive: '808000',
            olivedrab: '6b8e23',
            orange: 'ffa500',
            orangered: 'ff4500',
            orchid: 'da70d6',
            palegoldenrod: 'eee8aa',
            palegreen: '98fb98',
            paleturquoise: 'afeeee',
            palevioletred: 'd87093',
            papayawhip: 'ffefd5',
            peachpuff: 'ffdab9',
            peru: 'cd853f',
            pink: 'ffc0cb',
            plum: 'dda0dd',
            powderblue: 'b0e0e6',
            purple: '800080',
            red: 'ff0000',
            rosybrown: 'bc8f8f',
            royalblue: '4169e1',
            saddlebrown: '8b4513',
            salmon: 'fa8072',
            sandybrown: 'f4a460',
            seagreen: '2e8b57',
            seashell: 'fff5ee',
            sienna: 'a0522d',
            silver: 'c0c0c0',
            skyblue: '87ceeb',
            slateblue: '6a5acd',
            slategray: '708090',
            snow: 'fffafa',
            springgreen: '00ff7f',
            steelblue: '4682b4',
            tan: 'd2b48c',
            teal: '008080',
            thistle: 'd8bfd8',
            tomato: 'ff6347',
            turquoise: '40e0d0',
            violet: 'ee82ee',
            violetred: 'd02090',
            wheat: 'f5deb3',
            white: 'ffffff',
            whitesmoke: 'f5f5f5',
            yellow: 'ffff00',
            yellowgreen: '9acd32'
        };
        return function(color) {
            if(c[color] != null) return true;
            else return false;
        };
    })();

    Rc.prototype.isStr = function(s, propval, blur) {
        if(s === propval && blur) {
            this.insertMsg(this.name + 'の "' + propval  + '" が未入力です');
            return false;
        }
        
        if(s.length > 51) {
            this.insertMsg(this.name + 'の "' + propval  + '" の値は50文字までにしてください');
            return false;            
        }
        
        return true;
    };

    Rc.prototype.checkValue = function() {
        var ret = [], arg = this.data.arg;
        var i = 0, l = arg.length;

        for(var name, val, propval, isBlurStr; i < l; i++) {
            if(typeof arg[i] !== 'string') {
                name = arg[i].name; val = arg[i].value;
                propval = arg[i].getAttribute('value'); // プレースホルダーがらみ
                isBlurStr = (arg[i].className.split(' ')[1])? 1 : 0; // プレースホルダーがらみ
                switch(name) {
                  case 'gradient':
                  case 'imagedata':
                    if(val !== 'none') {
                        ret[i] = val;
                    } else {
                        var m;
                        if(name === 'gradient') {
                            m = this.name + 'のCanvasGradientオブジェクトがありません';
                        } else if(name == 'imagedata') {
                            m = this.name + 'のImageDataオブジェクトがありません';
                        }
                        this.insertMsg(m);
                        ret.unshift('onerror');
                    }
                    break;
                  case 'select':
                  case 'ptnimage':
                  case 'drawimage':
                    ret[i] = val;
                    break;
                  case 'num':
                  case 'angle':
                    var n = this.isNum(val, propval, isBlurStr);

                    if(n) {
                        ret[i] = +val;
                    } else {
                        ret.unshift('onerror');						
                    }
                    break;
                  case 'color':
                    var s = this.isColor(val, propval, isBlurStr);

                    if(s) {
                        ret[i] = val;
                    } else {
                        ret.unshift('onerror');
                    }
                    break;
                 case 'colorplus':

                    if(this.gradient[val] != null) {
                        ret[i] = val;
                        break;
                    }                    
                    var s = this.isColor(val, propval, isBlurStr);

                    if(s) {
                        ret[i] = val;
                    } else {
                        ret.unshift('onerror');
                    }
                    break;                    
                case 'str':
                    var s = this.isStr(val, propval, isBlurStr);

                    if(s) {
                        ret[i] = val;
                    } else {
                        ret.unshift('onerror');
                    }
                    break;
                }
            } else {
                ret[i] = arg[i];
            }
        }
        if(ret[0] === 'onerror') return false;
        return ret;
    };

    Rc.prototype.retValue = function() {
        return this.checkValue();
    };

    // イベント

    Rc.prototype.onMouseDownBtn = function(e) {
        if(!e.button) this.setAttribute('style', 'background:#ea4261;background:-webkit-gradient(linear, left top, left bottom, from(#aa1231), to(#ea4261));background:-moz-linear-gradient(top, #aa1231, #ea4261');
    };

    Rc.prototype.onMouseUpBtn = function(e) {
        if(!e.button) this.removeAttribute('style');
    };

    Rc.prototype.onMouseDownPanelBtn = function(e) {
        if(!e.button) this.setAttribute('style', 'background:#41b611;background:-webkit-gradient(linear, left top, left bottom, from(#41b611), to(#81f651));background:-moz-linear-gradient(top, #41b611, #81f651);');
    };

    Rc.prototype.onMouseUpPanelBtn = function(e) {
        if(!e.button) this.removeAttribute('style');
    };    

    Rc.prototype.onkeyupBtn = function() {
        var self = this;
        return function(e) {
            if(e.keyCode === 13) {
                self.onClickBtn()(); // もうこれでいいや
            }
        };
    };

    Rc.prototype.onClickBtn = function() {
        var self = this;
        return function() {
            self.clearMsg();
            var arg = self.retValue();
            if(arg instanceof Array) {
                self.tryCatch(arg);
            } else {
                self.openMsg();
                return;
            }
        };
    };
    
    // プレースホルダー(急遽つけたのでバグあるかもしれないから気をつけれ)

    Rc.prototype.onBlurInput = function(e) {
        if(this.value === '') {
            this.value = this.getAttribute('value');
            this.className += ' inputBlur';
        }
    };
    
    Rc.prototype.onFocusInput = function(e) {
        var c = this.className.split(' ');
        if(c[1]) {
            this.value = '';
            this.className = c[0];
        }
    };

    // canvasAPI

    Rc.prototype.toDataURL = function(ctx, arg /* type */) {
        if(this.stopper) return;
        var e = elems.cvs.toDataURL(arg[0]);
        this.insertPanelCode('var img' + this.getCount(this.name) + ' = canvas.toDataURL("' + arg[0] + '");');

        var w = open();
        w.document.write('<button onclick="window.close();">close</button><h1>↓&lt;img src="画像データ" /&gt;として表示させた例</h1><img src="' + e + '" />');
        w.document.write('<h1>↓実際に返ってくる画像データ("'+ arg[0]  +'"の場合)</h1>');
        w.document.write(e);
        w.document.close();
        this.incrementCount(this.name);
    };

    Rc.prototype.getContext = function(ctx, arg /* cntextId */) {
        if(arg[0] === 'contextId') {
            this.freeMsg('このメソッドは動作しません');
            throw new Error();
        } /*else {
           // 保留 
        }*/
    };

    Rc.prototype.beginPath = function(ctx) {
        ctx.beginPath();
        this.insertPanelCode('ctx.beginPath();');
    };

    Rc.prototype.moveTo = function(ctx, arg /* x, y */) {
        ctx.moveTo(arg[0], arg[1]);
        this.insertPanelCode('ctx.moveTo(' + arg[0] + ', ' + arg[1] + ');');
    };

    Rc.prototype.closePath = function(ctx) {
        ctx.closePath();
        this.insertPanelCode('ctx.closePath();');
    };

    Rc.prototype.lineTo = function(ctx, arg /* x, y */) {
        ctx.lineTo(arg[0], arg[1]);
        this.insertPanelCode('ctx.lineTo(' + arg[0] + ', ' + arg[1] + ');');
    };

    Rc.prototype.quadraticCurveTo = function(ctx, arg /* cpx, cpy, x, y  */) {
        ctx.quadraticCurveTo(arg[0], arg[1], arg[2], arg[3]);
        this.insertPanelCode('ctx.quadraticCurveTo(' + arg.join(', ') + ');');
    };

    Rc.prototype.bezierCurveTo = function(ctx, arg /* cp1x, cp1y, cp2x, cp2y, x, y  */) {
        ctx.bezierCurveTo(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5]);
        this.insertPanelCode('ctx.bezierCurveTo(' + arg.join(', ') + ');' );
    };

    Rc.prototype.arcTo = function(ctx, arg /* x1, y1, x2, y2, radius */) {
        ctx.arcTo(arg[0], arg[1], arg[2], arg[3], arg[4]);
        this.insertPanelCode('ctx.arcTo(' + arg.join(', ') + ');');
    };

    Rc.prototype.arc = function(ctx, arg /* x, y, radius, startAngle, endAngle, anticlockwise */) {
        var b = (arg[5] === 'false') ? false : true;
        ctx.arc(arg[0], arg[1], arg[2], arg[3], arg[4], b);
        this.insertPanelCode('ctx.arc(' + arg.join(', ') + ');');
    };

    Rc.prototype.rect = function(ctx, arg /* x, y, w, h */) {
        ctx.rect(arg[0], arg[1], arg[2], arg[3]);
        this.insertPanelCode('ctx.rect(' + arg.join(', ') + ');');
    };

    Rc.prototype.fill = function(ctx) {
        ctx.fill();
        this.insertPanelCode('ctx.fill();');
    };    
    
    Rc.prototype.stroke = function(ctx) {
        ctx.stroke();
        this.insertPanelCode('ctx.stroke();');
    };

    Rc.prototype.clip = function(ctx) {
        ctx.clip();
        this.insertPanelCode('ctx.clip();');
    };

    Rc.prototype.isPointInPath = function(ctx, arg /* x, y */) {
        var p = ctx.isPointInPath(arg[0], arg[1]);
        this.insertPanelCode('var p' + this.getCount(this.name) + ' = ctx.isPointInpath(' + arg.join(', ') + ');',
                             'console.log(p' + this.getCount(this.name) + '); // ' + p);
        this.incrementCount(this.name);
    };

    Rc.prototype.clearRect = function(ctx, arg /* x, y, w, h */) {
        ctx.clearRect(arg[0], arg[1], arg[2], arg[3]);
        this.insertPanelCode('ctx.clearRect(' + arg.join(', ') + ');');
    };

    Rc.prototype.fillRect = function(ctx, arg /* x, y, w, h */) {
        ctx.fillRect(arg[0], arg[1], arg[2], arg[3]);
        this.insertPanelCode('ctx.fillRect(' + arg.join(', ') + ');');
    };

    Rc.prototype.strokeRect = function(ctx, arg /* x, y, w, h */) {
        ctx.strokeRect(arg[0], arg[1], arg[2], arg[3]);
        this.insertPanelCode('ctx.strokeRect(' + arg.join(', ') + ');');
    };

    Rc.prototype.addColorStop = function(ctx, arg /* offset, color */) {
        if(this.stopper) return;
        var offset = (arg[1] < 0) ? 0 : (arg[1] > 1) ? 1 : arg[1];
        this.gradient[arg[0]].addColorStop(offset, arg[2]);
        this.insertPanelCode(arg[0] + '.addColorStop(' + offset + ', "' + arg[2] + '");');
    };

    Rc.prototype.createLinearGradient = function(ctx, arg /* x0, y0, x1, y1 */) {
        if(this.stopper) return;
        var c = this.getCount(this.name),
            n = 'gradient' + c;
        if(!this.gradient[n]) {
            this.gradient[n] = ctx.createLinearGradient(arg[0], arg[1], arg[2], arg[3]);
            this.selectObjPropName.push(n);
        }
        this.insertPanelCode('var ' + n + ' = ctx.createLinearGradient(' + arg.join(', ') + ');');
        this.incrementCount(this.name);
    };

    Rc.prototype.createRadialGradient = function(ctx, arg /* x0, y0, r0, x1, y1, r1 */) {
        if(this.stopper) return;
        var c = this.getCount(this.name),
            n = 'gradient' + c;
        if(!this.gradient[n]) {
            this.gradient[n] = ctx.createRadialGradient(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5]);
            this.selectObjPropName.push(n);
        }
        this.insertPanelCode('var ' + n + ' = ctx.createRadialGradient(' + arg.join(', ') + ');');
        this.incrementCount(this.name);
    };

    Rc.prototype.createPattern = function(ctx, arg /* img, repetition */) {
        var c = this.getCount(this.name),
            ptn = ctx.createPattern(this.ptnimage[arg[0]], arg[1]);
            ctx.fillStyle = ptn; // 今のところこれは直接入れとく。
        
        this.insertPanelCode('var cimg' + c + ' = new Image();',
                             'cimg' + c + '.src = "' + arg[0] +  '?" + new Date().getTime();',
                             'cimg' + c + '.onload = function() {',
                             '    var pattern' + c + ' = ctx.createPattern(' + 'cimg' + c + ', "' +  arg[1] + '");',
                             '    ctx.fillStyle = pattern' + c + ';',
                             '};');
        this.incrementCount(this.name);
    };

    Rc.prototype.save = function(ctx) {
        ctx.save();
        this.insertPanelCode('ctx.save();');
    };

    Rc.prototype.restore = function(ctx) {
        ctx.restore();
        this.insertPanelCode('ctx.restore();');
    };

    Rc.prototype.scale = function(ctx, arg /* x, y */) {
        ctx.scale(arg[0], arg[1]);
        this.insertPanelCode('ctx.scale(' + arg[0] + ', ' + arg[1] + ');');
    };

    Rc.prototype.rotate = function(ctx, arg /* angle */) {
        ctx.rotate(arg[0]);
        this.insertPanelCode('ctx.rotate(' + arg[0] + ');');
    };

    Rc.prototype.translate = function(ctx, arg /* x, y */) {
        ctx.translate(arg[0], arg[1]);
        this.insertPanelCode('ctx.translate(' + arg[0] + ', ' + arg[1] + ');');
    };

    Rc.prototype.transform = function(ctx, arg /* m11, m12, m21, m22, dx, dy */) {
        ctx.transform(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5]);
        this.insertPanelCode('ctx.transform(' + arg.join(', ') + ');');
    };

    Rc.prototype.setTransform = function(ctx, arg /* m11, m12, m21, m22, dx, dy */) {
        ctx.setTransform(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5]);
        this.insertPanelCode('ctx.setTransform(' + arg.join(', ') + ');');
    };

    Rc.prototype.createImageData = function(ctx, arg /* sw, sh */) {
        if(arg[0] === 'sw') {
            this.freeMsg('このメソッドは動作しません');
            throw new Error();
        }/* else {
            // 保留。対応の場合opera10.61ではcreateImageDataがないので注意。
        }*/
    };

    Rc.prototype.getImageData = function(ctx, arg /* sx, sy, sw, sh */) {
        if(this.stopper) return;
        var c = this.getCount(this.name),
            n = 'imagedata' + c;
        if(!this.imagedata[n]) {
            this.imagedata[n] = ctx.getImageData(arg[0], arg[1], arg[2], arg[3]);
            this.selectObjPropName.push(n);
        }
        this.insertPanelCode('var ' + n + ' = ctx.getImageData(' + arg.join(', ') + ');');
        this.incrementCount(this.name);
    };
    
    Rc.prototype.putImageData1 = function(ctx, arg /* imagedata, dx, dy */) {
        ctx.putImageData(this.imagedata[arg[0]], arg[1], arg[2]);
        this.insertPanelCode('ctx.putImageData(' + arg.join(', ') + ');');
    };

    Rc.prototype.putImageData2 = function(ctx, arg /* imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight */) {
        ctx.putImageData(this.imagedata[arg[0]], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6]);
        this.insertPanelCode('ctx.putImageData(' + arg.join(', ') + ');');
    };

    Rc.prototype.ImageDataProperties = function(ctx, arg /* imagedata, properties(width, height, data) */) {
        var v = this.imagedata[arg[0]][arg[1]], l; 

        if(arg[1] === 'data') {
            l = v.length;
            v = v.slice(0, 12);
            v = '[' + v + ', ' + (l - v.length) + ' more...]';
        }
        var n = arg[1] + this.getCount(this.name);
        this.insertPanelCode('var ' + n + ' = ' + arg[0] + '.' + arg[1] + ';',
                             'console.log(' + n + '); // ' + v);
        this.incrementCount(this.name);
    };    

    Rc.prototype.drawImage1 = function(ctx, arg /* image dx dy */) {
        var c = this.getCount(this.name);
        ctx.drawImage(this.drawimage[arg[0]], arg[1], arg[2]);
        
        this.insertPanelCode('var dimg' + c + ' = new Image();',
                             'dimg' + c + '.src = "' + arg[0] +  '?" + new Date().getTime();',
                             'dimg' + c + '.onload = function() {',
                             '    ctx.drawImage(dimg' + c + ', ' + arg[1] + ', ' + arg[2] +  ');',
                             '};');
        this.incrementCount(this.name);
        
    };

    Rc.prototype.drawImage2 = function(ctx, arg /* image dx, dy, dw, dh*/) {
        var c = this.getCount(this.name);
        ctx.drawImage(this.drawimage[arg[0]], arg[1], arg[2], arg[3], arg[4]);
        
        this.insertPanelCode('var dimg' + c + ' = new Image();',
                             'dimg' + c + '.src = "' + arg[0] +  '?" + new Date().getTime();',
                             'dimg' + c + '.onload = function() {',
                             '    ctx.drawImage(dimg' + c + ', ' + arg[1] + ', ' + arg[2] + ', ' + arg[3] + ', ' + arg[4] + ');',
                             '};');
        this.incrementCount(this.name);
        
    };

    Rc.prototype.drawImage3 = function(ctx, arg /* image, dx, dy,,sx, sy, sw, sh, dx, dy, dw, dh */) {
        var c = this.getCount(this.name);
        ctx.drawImage(this.drawimage[arg[0]], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6], arg[7], arg[8]);
        
        this.insertPanelCode('var dimg' + c + ' = new Image();',
                             'dimg' + c + '.src = "' + arg[0] +  '?" + new Date().getTime();',
                             'dimg' + c + '.onload = function() {',
                             '    ctx.drawImage(dimg' + c + ', ' + arg[1] + ', ' + arg[2] + ', ' + arg[3] + ', ' + arg[4] + ', ' + arg[5] + ', ' + arg[6] + ', ' + arg[7] + ', ' + arg[8] + ');',
                             '};');
        this.incrementCount(this.name);
        
    };    

    Rc.prototype.fillText = function(ctx, arg /* text x, y */) {
        ctx.fillText(arg[0], arg[1], arg[2]);
        this.insertPanelCode('ctx.fillText("' + arg[0] + '", ' + arg[1] + ', ' + arg[2] + ');');
    };

    Rc.prototype.strokeText = function(ctx, arg /* text x, y */) {
        ctx.strokeText(arg[0], arg[1], arg[2]);
        this.insertPanelCode('ctx.strokeText("' + arg[0] + '", ' + arg[1] + ', ' + arg[2] + ');');
    };

    Rc.prototype.measureText = function(ctx, arg /* text */) {
        this.insertPanelCode('var metrics' + this.getCount(this.name) + ' = ctx.measureText("' + arg[0] + '");',
                             'console.log(metrics' + this.getCount(this.name) + '.width); // ' + ctx.measureText(arg[0]).width);
        this.incrementCount(this.name);
    };

    Rc.prototype.drawFocusRing = function(ctx, arg /* element, x, y */) {
        if(arg[0] === 'element') {
            this.freeMsg('このメソッドは動作しません');
            throw new Error();
        }/* else {
            // 保留。
        }*/
    };

    Rc.prototype.strokeStyle = function(ctx, arg) {
        if(!this.gradient[arg[0]]) {
            ctx.strokeStyle =  arg[0];
            this.insertPanelCode('ctx.strokeStyle = "' + arg[0] + '";');        
        } else {
            ctx.strokeStyle = this.gradient[arg[0]];
            this.insertPanelCode('ctx.strokeStyle = ' + arg[0] + ';');
        }
    };

    Rc.prototype.fillStyle = function(ctx, arg) {
        if(!this.gradient[arg[0]]) {
            ctx.fillStyle =  arg[0];
            this.insertPanelCode('ctx.fillStyle = "' + arg[0] + '";');        
        } else {
            ctx.fillStyle = this.gradient[arg[0]];
            this.insertPanelCode('ctx.fillStyle = ' + arg[0] + ';');
        }
    };

    Rc.prototype.globalAlpha = function(ctx, arg) {
        var v = (arg[0] < 0) ? 0 : (arg[0] > 1) ? 1 : arg[0];
        ctx.globalAlpha = v;
        this.insertPanelCode('ctx.globalAlpha = ' + v + ';');
    };

    Rc.prototype.globalCompositeOperation = function(ctx, arg) {
        ctx.globalCompositeOperation = arg[0];
        this.insertPanelCode('ctx.globalCompositeOperation = "' + arg[0] + '";');
    };

    Rc.prototype.lineWidth = function(ctx, arg) {
        var v = (arg[0] > 0) ? arg[0] : 1;
        ctx.lineWidth = v;
        this.insertPanelCode('ctx.lineWidth = ' + v + ';');
    };

    Rc.prototype.lineCap = function(ctx, arg) {
        ctx.lineCap = arg[0];
        this.insertPanelCode('ctx.lineCap = "' + arg[0] + '";');
    };

    Rc.prototype.lineJoin = function(ctx, arg) {
        ctx.lineJoin = arg[0];
        this.insertPanelCode('ctx.lineJoin = "' + arg[0] + '";');
    };

    Rc.prototype.miterLimit = function(ctx, arg) {
        var v = (arg[0] > 0) ? arg[0] : 1;
        ctx.miterLimit = v;
        this.insertPanelCode('ctx.miterLimit = ' + v + ';');
    };

    Rc.prototype.shadowColor = function(ctx, arg) {
        ctx.shadowColor = arg[0];
        this.insertPanelCode('ctx.shadowColor = "' + arg[0] + '";');
    };

    Rc.prototype.shadowOffsetX = function(ctx, arg) {
        ctx.shadowOffsetX = arg[0];
        this.insertPanelCode('ctx.shadowOffsetX = ' + arg[0] + ';');
    };

    Rc.prototype.shadowOffsetY = function(ctx, arg) {
        ctx.shadowOffsetY = arg[0];
        this.insertPanelCode('ctx.shadowOffsetY = ' + arg[0] + ';');
    };

    Rc.prototype.shadowBlur = function(ctx, arg) {
        var v = (arg[0] > 0) ? arg[0] : 1;
        ctx.shadowBlur = v;
        this.insertPanelCode('ctx.shadowBlur = ' + v + ';');
    };

    Rc.prototype.font = function(ctx, arg) {
        ctx.font = arg[0];
        this.insertPanelCode('ctx.font = "' + arg[0] + '";');
    };

    Rc.prototype.textAlign = function(ctx, arg) {
        ctx.textAlign = arg[0];
        this.insertPanelCode('ctx.textAlign = "' + arg[0] + '";');
    };

    Rc.prototype.textBaseline = function(ctx, arg) {
        ctx.textBaseline = arg[0];
        this.insertPanelCode('ctx.textBaseline = "' + arg[0] + '";');
    };

    //

    var IFR = function(select, imagecase){
        this.select = select;
        this.data = imagecase;
        // イベントを起こす要素が同一のため重複してイベントがおきる現象がある。
        // 対象外のイベントをはじくため要素名のみ記憶する変数を用意して、この名前の要素のみイベントを行うようにした。
        // 応急処置的なものなので注意。
        this.nowname = null;
    };
    
    IFR.prototype.ff = elems.fileForm;
    
    IFR.prototype.init = function() {
        addListener(this.select, 'change', this.displayForm());
        addListener(this.ff.input, 'change', this.addImage());
    };
    
    IFR.prototype.displayForm = function() {
        var self = this;
        return function(e) {
            if(this.value === 'addImage') { // valueをaddImageとすればイベントがおきる
                doc.body.appendChild(self.ff.d);
                self.ff.input.focus();
                addListener(doc.body, 'mousedown', self.noneForm());
                self.nowname = e.target.name; // 画像を追加する要素の名前
            }
        };
    };

    IFR.prototype.noneForm = function() {
        var self = this;
        return function(e) {
            if(!e.button) {
                if(e.target.parentNode === self.ff.d ||
                   e.target === self.ff.d) {
                    return;
                }
                self.ff.input.value = '';
                doc.body.removeChild(self.ff.d);
                removeListener(doc.body, 'mousedown', arguments.callee);
                self.nowname = null; // 追加したら要素名はリセット
            }
        };
    };

    IFR.prototype.addImage = function() {
        var self = this;
        return function() {
            if(!self.ff.input.value ||
               self.select.name !== self.nowname) {
                return;
            }

            var  imgdata = self.ff.input.files[0];

            if(imgdata &&
               imgdata.type === 'image/png' ||
               imgdata.type === 'image/gif' ||
               imgdata.type === 'image/jpeg'){
                var reader = new FileReader();
                reader.readAsDataURL(imgdata);
                
                reader.onload = function(e) {
                    if(self.data[imgdata.name] == null) {
                        self.data[imgdata.name] = toCanvasElement(e.target.result);
                        
                        var o = doc.createElement('option');
                        o.value = imgdata.name;
                        o.appendChild(doc.createTextNode(imgdata.name));
                        self.select.insertBefore(o, self.select.lastChild);
                        self.message('画像データを追加しました。', 2000);
                    } else {
                        self.message('既に追加した名前の画像データです。', 2000);
                        return ;
                    }
                    
                };

                reader.onerror = function(e) {
                    if(e.target.error.code == e.target.error.NOT_READABLE_ERR) {
                        alert('エラーが起きました');
                    }
                };                
            } else {
                self.message('そのファイルは追加できません。', 2000);
            }
        };
    };

    IFR.prototype.message = function(word, time) {
        var ff = this.ff;
        ff.mes.innerHTML = word;
        setTimeout(function(){
            ff.mes.innerHTML = '';                        
        }, time); 
        
    };

    //

    var Tooltip = function(){};
    
    Tooltip.prototype.angletip = (function() {
        var p = doc.createElement('p'),
        input = doc.createElement('input'),
        span = doc.createElement('span');
        input.type = 'text';
        input.style.cssText = 'text-align:center;width:28px;height:10px;outline:1px #000 solid;';

        p.innerHTML = '0～360の値を入力。自動的に以下の<br />計算結果の値に変換されます。<br />';

        p.appendChild(input);
        p.appendChild(doc.createTextNode(' × π / 180 = '));
        p.appendChild(span);
        return {p: p, input: input, span: span};
    })();

    Tooltip.prototype.gradTip = (function() {
        var p = doc.createElement('p');
        p.innerHTML = 'createLinearGradient()やcreateRadialGradient()で<br />' +
            'CanvasGradientオブジェクトを生成し、それらのオブジェクト<br />' +
            'から選んで利用してください。<br /><br />' +
            '<span style="color:red;">※色を設定したオブジェクトはstrokeStyleやfillStyleにsetして<br />' +
            'ください。この一覧にある名前の通り入力すれば反映されます。</span>';
        return p;
    })();

    Tooltip.prototype.colorTip = (function() {
        var p = doc.createElement('p');
        p.innerHTML = 'colorの入力形式例：<br />' +
            '１．rgb(0, 0, 0)<br />' +
            '２．rgba(0, 0, 0, 1)<br />' +
            '３．#000 or #000000<br />' +
            '４．black<br />' +
            'のいずれか4つの方法で指定可。';
        return p;
    })();
    
    Tooltip.prototype.imageTip = (function() {
        var d = doc.createElement('div'),
            p = doc.createElement('p'),
            s = doc.createElement('span'),
            c = doc.createElement('canvas'),
            ctxt = c.getContext('2d');
        p.appendChild(doc.createTextNode('画像プレビュー : '));
        p.appendChild(s);

        c.width = 150, c.height = 150;

        d.appendChild(p);
        d.appendChild(c);
        return {d: d, p: p, s: s, ctxt: ctxt};
    })();

    Tooltip.prototype.imageDataTip = (function() {
        var d = doc.createElement('div'),
            p = doc.createElement('p'),
            s = doc.createElement('span'),
            c = doc.createElement('canvas'),
            ctxt = c.getContext('2d');
        p.innerHTML = 'FirstCanvasではgetImageData()で取得した、<br />' +
            'imageDataオブジェクトから選んで利用してください。<br /><br />' +
            '画像プレビュー:';
        p.appendChild(s);

        c.width = 1, c.height = 1;

        d.appendChild(p);
        d.appendChild(c);
        return {d: d, p: p, s: s, c: c, ctxt: ctxt};
    })();
    

    Tooltip.prototype.onFocusAngle = function() {
        var self = this;
        return function(e) {
            var result, v;
            self.onFocusInput.call(this);

            if(this.value !== '') {
                v = this.value / Math.PI * 180;
                this.value = v;
                result = v * Math.PI / 180;
                self.angletip.input.value = v;
                self.angletip.span.innerHTML = result;
            }
            return self.viewtt(elems.drawCtrls, self.angletip.p, this);
        };
    };

    Tooltip.prototype.onKeyupAngle = function() {
        var self = this;
        return function(e) {
            var v, result;
            
            if(this.value === '') {
                self.angletip.input.value = '';
                self.angletip.span.innerHTML = '';                
                return self.viewtt(elems.drawCtrls, self.angletip.p, this);
            }
            
            v = +this.value;
            if(isFinite(v)) {
                result = v * Math.PI / 180;
                self.angletip.input.value = v;
                self.angletip.span.innerHTML = result;
            } else {    
                self.angletip.input.value = '×';
                self.angletip.span.innerHTML = '数値を入力してください';
            }
            return self.viewtt(elems.drawCtrls, self.angletip.p, this);
        };
    };

    Tooltip.prototype.onBlurAngle = function() {
        var self = this;
        return function(e) {
            var v;
            if(this.value !== '') {
                v = +this.value;
                if(isFinite(v)) {
                    this.value = v * Math.PI / 180;                
                } else {
                    this.value = '';
                }
            }
            self.onBlurInput.call(this); 
            self.angletip.input.value = '';
            self.angletip.span.innerHTML = '';
            self.removett();
        };
    };

    Tooltip.prototype.onFocusGrad = function() {
        var self = this;
        return function(e) {
            self.viewtt(elems.drawCtrls, self.gradTip, this);
        };
    };

    Tooltip.prototype.onBlurGrad = function() {
        var self = this;
        return function(e) {
            self.removett();
        };
    };

    Tooltip.prototype.onFocusColor = function() {
        var self = this;
        return function(e) {
            self.onFocusInput.call(this);
            self.viewtt(elems.drawCtrls, self.colorTip, this);
        };
    };

    Tooltip.prototype.onBlurColor = function() {
        var self = this;
        return function(e) {
            self.onBlurInput.call(this);
            self.removett();
        };        
    };

    Tooltip.prototype.onFocusImage = function(obj) {
        var self = this;
        return function(e) {
            var t = self.imageTip,
                v = self[obj][this.value];
            if(this.value === 'addImage') {
                this.firstChild.selected = true;
            }
            
            if(v != null) {
                t.ctxt.drawImage(v, 0, 0, 150, 150);
                t.s.innerHTML = v.width + ' × ' + v.height;
            }

            self.viewtt(elems.drawCtrls, t.d, this);
        };
    };

    Tooltip.prototype.onBlurImage = function() {
        var self = this;
        return function(e) {
            self.removett();
        };
    };

    Tooltip.prototype.onChangeImage = function(obj) {
        var self = this;
        return function(e) {
            var t = self.imageTip,
                v = self[obj][this.value];

            if(this.value === 'addImage') {
                this.firstChild.selected = true;
            }
            
            if(v != null) {
                t.ctxt.drawImage(v, 0, 0, 150, 150);
                t.s.innerHTML = v.width + ' × ' + v.height;
            }            
        };
    };

    Tooltip.prototype.onFocusImageData = function() {
        var self = this;
        return function(e) {
            var t = self.imageDataTip,
                v = self.imagedata[this.value];

            if(v != null) {
                t.c.width = v.width;
                t.c.height = v.height;
                t.ctxt.putImageData(v, 0, 0);
                t.s.innerHTML = v.width + ' × ' + v.height;
            } else {
                t.c.width = 1;
                t.c.height = 1;
            }
            
            self.viewtt(elems.drawCtrls, t.d, this);
        };
        
    };

    Tooltip.prototype.onBlurImageData = function() {
        var self = this;
        return function(e) {
            self.removett();
        };        
    };

    Tooltip.prototype.onChangeImageData = function() {
        var self = this;
        return function(e) {
            var t = self.imageDataTip,
            v = self.imagedata[this.value];

            if(v != null) {
                t.c.width = v.width;
                t.c.height = v.height;            
                t.ctxt.putImageData(v, 0, 0);
                t.s.innerHTML = v.width + ' × ' + v.height;
            }
            self.removett();
            self.viewtt(elems.drawCtrls, t.d, this);
        };
    };    
    
    Tooltip.prototype.viewtt = function(parentElem, innerElem, target) {
        var x, y, tt = elems.tt;
        var tinner = elems.ttInner;
        if(tinner.hasChildNodes()) { tinner.removeChild(tinner.firstChild); }
        tinner.appendChild(innerElem);
        parentElem.appendChild(tt);
        x = target.offsetLeft + (target.offsetWidth / 2) - (parseInt(getStyleProp(tt, 'width'), 10) / 2);
        y = -170 + target.offsetTop - parseInt(getStyleProp(tt, 'height'), 10);
        tt.setAttribute('style', 'margin-top:' + y + 'px;left:' + x + 'px');
    };

    Tooltip.prototype.removett = function() {
        elems.drawCtrls.removeChild(elems.tt);
        elems.tt.removeAttribute('style');
    };

    //

    var Nbs = function(){
        this.status = 0;
    };
    Nbs.prototype.elemd = elems.newsBrd.d;
    Nbs.prototype.elemp = elems.newsBrd.p;    

    Nbs.prototype.openMsg = function() {
        var self = this,
            e = this.elemd.style,
            h = this.elemd.offsetHeight,
            duration = 150,
            start = new Date*1;

        e.top = -h + 'px';

        var id = setInterval(function() {
            var now = new Date*1,
            time = now - start,
            progh =  Math.floor(h * (time / duration)) - h;

            if(time > duration) {
                clearInterval(id);
                self.status = 1;
                e.top = '0px';
            } else {
                e.top = progh + 'px';
            }
        }, 16);
    };

    Nbs.prototype.closeMsg = function() {
        if(!this.status) return;
        var self = this,
            e = this.elemd.style,
            h = this.elemd.offsetHeight,
            start = new Date*1,
            duration = 150;

        var id = setInterval(function() {
            var now = new Date*1,
            time = now - start,
            progh = -Math.floor(h * (time / duration));

            if(time > duration) {
                clearInterval(id);
                e.top = -(h + 4) + 'px';
                self.status = 0;
            } else {
                e.top = progh + 'px';
            }
        }, 16);        
    };

    Nbs.prototype.clearMsg = function() {
        while(this.elemp.firstChild) {
            this.elemp.removeChild(this.elemp.firstChild);
        }
    };
    
    Nbs.prototype.insertMsg = function(msg) {
        if(this.elemp.hasChildNodes()) {
            this.elemp.appendChild(doc.createElement('br'));
            this.elemp.appendChild(doc.createTextNode('・' + msg));
        } else {
            this.elemp.appendChild(doc.createTextNode('・' + msg));
        }
    };

    Nbs.prototype.completeMsg = function(stop) {
        var self = this;
        if(!this.elemp.hasChildNodes()) {
            this.insertMsg('実行しました');
        }
        this.openMsg();
        setTimeout(function() {
            self.closeMsg();
        }, 1350);
    };

    Nbs.prototype.errorMsg = function(msg) {
        if(!this.elemp.hasChildNodes()) {
            this.insertMsg(msg);
        }
        this.openMsg();
    };

    Nbs.prototype.freeMsg = function(msg) {
        this.insertMsg(msg);
    };

    // レンダリング以外での通知
    Nbs.prototype.summaryMsg = function(msg) {
        this.clearMsg();
        this.insertMsg(msg);
        this.completeMsg();
    };

    //

    var Panel = function() {
        this.apiStack = [];
        this.canvasStack = [];
        this.stopper = false; // undoを利用するにあたってパネルのコード挿入やtoDataURLなどの作動を停停止させる。いろんなとこ飛んでるから検索しれ
    };

    Panel.prototype.initCanvasStack = function() {
        var o = this.makeCanvas();
        this.canvasStack = [{ ctx: o['ctx'], canvas: o['canvas'] }];
    };
    
    Panel.prototype.makeCanvas = function() {
        var ctx, c = doc.createElement('canvas');
        c.height = wh;
        c.width = ww;
        c.id = 'canvas';
        ctx = c.getContext('2d');

        return { ctx: ctx, canvas: c };
    };
    
    Panel.prototype.pushStack = function(name, arg) {
        var o = {}; o[name] = arg;
        if(this.apiStack.length) {
            this.stopper = true;
            this.pushCanvasStack();
        } else {
            this.initCanvasStack();
        }
        this.apiStack[this.apiStack.length] = o;
    };

    Panel.prototype.pushCanvasStack = function() {
        var o = this.makeCanvas();
        var ctx = o['ctx'], c = o['canvas'];

        var i = 0, s = this.apiStack, l = s.length;
        for(;i < l; i++) {
            for(var name in s[i]) this[name](ctx, s[i][name]);
        }
        this.stopper = false;
        this.canvasStack[this.canvasStack.length] = { ctx: ctx, canvas: c };
    };

    Panel.prototype.clickBtnUndo = function() {
        var self = this;
        return function() {
            if(self.canvasStack.length > 0) {
                var o = self.canvasStack.pop();
                var name = self.apiStack.pop();
                for(var n in name) name = n;
                doc.body.removeChild(elems.cvs);

                self.coordinatesEvt('remove'); // Coordinatesのイベント削除
                
                elems.cvs = o['canvas'];
                ctx = o['ctx'];
                doc.body.appendChild(elems.cvs);

                self.decrementCount(name); // 該当するCountを下げる
                self.deleteSelectObject(name); // CanvasGradient/ImageDataオブジェクトのセレクトボックスを整理
                self.coordinatesEvt('add'); // Coordinatesのイベント再登録
                elems.codeTxtArea.removeChild(elems.codeTxtArea.lastChild); // codeパネルのコードを削除

                var text = (90 < Math.random() * 100) ? 'あなたの人生をUndoできなくともcanvasはUndo!' : 'Undo!';
                self.summaryMsg(text); // nbsに通知
            } else {
                // nbsに通知
                var text = (90 < Math.random() * 100) ? '人生と同じでこれ以上Undoできないよ!' : 'cannot Undo!';                
                self.summaryMsg(text);
            }
        };
    };

    Panel.prototype.clickBtnClear = function() {
        var self = this;
        return function() {
            getSize(); // canvasのwidthとheight更新
            self.coordinatesEvt('remove'); // Coordinatesのイベント削除

            //canvasを初期化
            var o = self.makeCanvas();
            doc.body.removeChild(elems.cvs);
            
            elems.cvs = o['canvas'];
            ctx = o['ctx'];
            doc.body.appendChild(elems.cvs);

            self.coordinatesEvt('add'); // Coordinatesのイベント再登録
            
            // codeパネルを初期化
            elems.codeTxtArea.parentNode.removeChild(elems.codeTxtArea);
            elems.panel.style.height = wh - 190 + 'px';
            elems.panelCnt.style.height = wh - 230 + 'px';

            elems.codeTxtArea = (function() {
                var u = doc.createElement('ul'),
                l = doc.createElement('li');
                l.appendChild(doc.createTextNode('var ctx = canvas.getContent("2d");'));
                u.style.height = wh - 270 + 'px';
                u.appendChild(l);
                u.id = 'codeTxtArea';
                elems.code.insertBefore(u, elems.codeBtn.u);
                return u;
            })();

            self.getCvsSize(); // toolのcanvas size更新            
            self.reset(); // stackの初期化            
            self.clearCount(); // Countの初期化
            self.clearObject(); // gradientやImageDataの初期化

            // nbsに通知
            var text = (90 < Math.random() * 100) ? '過去はClearできないけどcanvasはClear!' : 'Clear!';
            self.summaryMsg(text);
        };
    };
    
    Panel.prototype.clickBtnCopy = function() {
        var self = this;
        return function() {
            // textarea生成
            var e = doc.createElement('textarea');
            e.style.height = getStyleProp(elems.codeTxtArea, 'height');
            e.style.width = getStyleProp(elems.codeTxtArea, 'width');

            // ソースコード取得
            var i = 0,
                children = elems.codeTxtArea.childNodes,
                l = children.length;
            for(var text = '', s; i < l; i++) {
                s = children[i].innerHTML + '\n';
                text += s;
            }
            e.innerHTML = text.replace(/\<br\>/g, '\n'); // brタグを改行に

            elems.codeTxtArea.parentNode.replaceChild(e, elems.codeTxtArea);
            e.select();

            // 元のパネルに戻すイベント登録と削除
            addListener(e, 'blur', function(){
                e.parentNode.replaceChild(elems.codeTxtArea, e);
                removeListener(e, 'blur', arguments.callee);
            });
        };
    };

    Panel.prototype.reset = function() {
        this.apiStack = [];
        this.canvasStack = [];
    };

    Panel.prototype.getCvsSize = function() {
        elems.toolArea.wSize.value = elems.cvs.width;
        elems.toolArea.hSize.value = elems.cvs.height;
    };

    Panel.prototype.getCvsCoordinates = function(e) {
        if(elems.panelCnt.firstChild !== elems.tool) return;

        elems.toolArea.cx.value = e.offsetX || e.layerX;
        elems.toolArea.cy.value = e.offsetY || e.layerY;
    };

    Panel.prototype.saveCvsCoordinates = function(e) {
        elems.toolArea.clickX.value = e.offsetX || e.layerX;
		elems.toolArea.clickY.value = e.offsetY || e.layerY; 
    };

    Panel.prototype.coordinatesEvt = function(evt) { // 登録と削除
        if(evt === 'add') {
            addListener(elems.cvs, 'mousemove', this.getCvsCoordinates);
            addListener(elems.cvs, 'click', this.saveCvsCoordinates);
        } else if(evt === 'remove') {
            removeListener(elems.cvs, 'mousemove', this.getCvsCoordinates);
            removeListener(elems.cvs, 'click', this.saveCvsCoordinates);
        }
    };
    
    //

    var canvasEvt = function() {
        canvasEvt.evt(elems.mtdItems.concat(elems.propItems));
    };

    canvasEvt.click = null;

    canvasEvt.evt = function(item) {
        var inst = new Rc();
        inst.panelReady();

        for(var i = 0; i < item.length; i++) {
            for(var j = 0; j < item[i].length; j++)(function(_i, _j) {			
                addListener(item[_i][_j], 'click', function() {
                    if(canvasEvt.click !== this) {
                        canvasEvt.click = this;
                        // データの準備
                        inst.ready(this.firstChild.nodeValue);
                        // 最初の要素にフォーカスをあて、なければ最後にあてる
                        if(inst.data.arg[0].nodeType === 1) {
                            inst.data.arg[0].focus();
                        } else {
                            inst.data.type.lastChild.focus();
                        }
                    }
                    // メッセージを閉じる
                    if(inst.status) inst.closeMsg();
                });
            })(i, j);
        }
    };

    //

    var utilityEvts = function() {
        addListener(elems.switchCtrls, 'click', utilityEvts.switchCtrl);
        addListener(elems.switchPanel, 'click', utilityEvts.switchPanel);
        utilityEvts.changePanel();        
    };

    utilityEvts.switchCtrl = (function() {
        var f = 0;

        return function() {
            f = f ? 0 : 1;
            if(f) {
                elems.drawCtrls.setAttribute('style', 'margin-top:-11.6px;height:0px;');
                elems.viewWrap.setAttribute('style', 'display:none;');
                elems.switchCtrls.setAttribute('style', 'height:10.2px;');
                elems.switchCtrls.innerHTML = '▲';
            } else {
                elems.drawCtrls.removeAttribute('style');
                elems.viewWrap.removeAttribute('style');
                elems.switchCtrls.removeAttribute('style');
                elems.switchCtrls.innerHTML = '▼';
            }
        };
    })();	

    utilityEvts.switchPanel = (function() {
        var f = 0;

        return function() {
            f = f ? 0 : 1;
            if(f) {
                elems.panel.setAttribute('style', 'margin-left:-20px;width:0px;');
                elems.panelWrap.setAttribute('style', 'display:none;');
            } else {
                elems.panel.removeAttribute('style');
                elems.panelWrap.removeAttribute('style');
            }
        };
    })();

    utilityEvts.changePanel = function() {
        var i = 0, 
        clickElem = elems.changePanel.item[0];
        utilityEvts.changePanel.clickElem = clickElem;
        clickElem.setAttribute('style', 'background-color:#fff;color:#000;');

        (function() {
            var _i = i;
            addListener(elems.changePanel.item[_i], 'click', function() {
                var e;
                if(clickElem !== this) {
                    elems.panelCnt.replaceChild(elems[this.firstChild.nodeValue], elems.panelCnt.firstChild);
                    this.setAttribute('style', 'background-color:#fff;color:#000;');
                    clickElem.removeAttribute('style');
                    clickElem = this;
                }
            });	

            i += 1;
            if(i < elems.changePanel.item.length) arguments.callee();
        })();
    };

    utilityEvts.changePanel.clickElem = null;

    //

    window.firstCanvas = function() {
        elems.insert();
        fnEvts();
        canvasEvt();
        utilityEvts();
    };

    function toCanvasElement(path) {
        var c = document.createElement('canvas'),
            ctx = c.getContext('2d');
        var img = new Image();

        if(/^data:image\/.+;base64/.test(path)) {
            img.src = path;
        } else {
            img.src = path + '?' + new Date().getTime();
        }

        img.onload = function() {
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        return c;
    }

    function getSize() {
        wh = window.innerHeight;
        ww = window.innerWidth;
    }
    
    function ex(d, b, arg) {
        var proto = d.constructor.prototype;
        b.apply(d, arg);
        for(var p in b.prototype) {
            if(!proto[p]) {
                proto[p] = b.prototype[p];
            }
        }
    }

    function addListener(elem, ev, listener) {
        elem.addEventListener(ev, listener, false);
        // window.addEventListener('unload', function(){
        //     removeListener(elem, ev, listener);
        // }, false);
    }

    function removeListener(elem, ev, listener) {
        elem.removeEventListener(ev, listener, false);
    }

    function getStyleProp(elem, prop) {
        return doc.defaultView.getComputedStyle(elem, null)[prop];
    }

    function addStyleRule(selector, val) { // つかってみた
        var sheet = doc.styleSheets[0];
            sheet.insertRule(selector + '{' + val + '}', sheet.cssRules.length);
    }

})(window, document);