
Other_Class = function () { };
////////////////////////////////////
Other_Class.prototype = {

    /////////////////////////////////////////////////////////////
    //              CK-EDITOR & CK-FINDER                      //
    /////////////////////////////////////////////////////////////
    CKEditor_Init: function (textArea, toolBar, w, h) {
        //textArea: replaced by CKEditor
        //toolBar: Basic or Full
        wh = w;
        ht = h;
        if (ht == "auto")
            ht = ($(window).height() - (310));
        else
            ht = ($(window).height() - (310 - parseInt(ht)));
        if (toolBar == "Full") {
	        CKEDITOR.replace(textArea, {
                toolbarGroups: [
                    {
                        name: 'document',
                        groups: ['mode', 'document', 'doctools']
                    },
                    {
                        name: 'basicstyles',
                        groups: ['basicstyles', 'cleanup']
                    },
                    {
                        name: 'colors',
                        groups: ['colors']
                    },
                    {
                        name: 'paragraph',
                        groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
                    },
                    {
                        name: 'editing',
                        groups: ['find', 'selection', 'spellchecker', 'editing']
                    },
                    {
                        name: 'links',
                        groups: ['links']
                    },
                    {
                        name: 'insert',
						groups: [ 'Image', 'Image2', 'EmbedSemantic', 'Table', 'HorizontalRule', 'SpecialChar' ]
                        //groups: ['insert']
                    },
                    {
                        name: 'clipboard',
                        groups: ['clipboard', 'undo']
                    },
                    {
                        name: 'styles',
                        groups: ['styles']
                    },
                    {
                        name: 'tools',
                        groups: ['tools', 'youtube']
                    },
                    {
                        name: 'others',
                        groups: ['others']
                    }
                ],
                ignoreEmptyParagraph: true,
                width: wh,
                height: ht,
                on: {
                    instanceReady: loadBootstrap,
                    mode: loadBootstrap
                },
                enterMode: CKEDITOR.ENTER_BR,
                shiftEnterMode: CKEDITOR.ENTER_P,
                extraPlugins: 'codemirror,embed,autoembed,youtube,pastefromgdocs,toc,imagebrowser',
                contentsCss: ['/bootstrap/bootstrap3/css/bootstrap.min.css', '/ckeditor/contents.css'],
                embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&api_key=4cbe3d04773cb1a322d670&callback={callback}',
                "imageBrowser_listUrl" : "/files",
                youtube_responsive: true,
                //image2_alignClasses: ['text-left', 'text-center', 'text-right'],
                image2_disableResizer: false,
                //extraPlugins: 'layoutmanager,soundPlayer,ckawesome',
            });
            function loadBootstrap(event) {
                if (event.name == 'mode' && event.editor.mode == 'source')
                    return; // Skip loading jQuery and Bootstrap when switching to source mode.
                var jQueryScriptTag = document.createElement('script');
                var popperScriptTag = document.createElement('script');
                var bootstrapScriptTag = document.createElement('script');
                jQueryScriptTag.src = '/bootstrap/bootstrap3/js/jquery.min.js';
                bootstrapScriptTag.src = '/bootstrap/bootstrap3/js/bootstrap.min.js';
                var editorHead = event.editor.document.$.head;
                editorHead.appendChild(jQueryScriptTag);
                jQueryScriptTag.onload = function() {
                    editorHead.appendChild(bootstrapScriptTag);
                };
            }
        }
        if (toolBar == "Basic") CKEDITOR.replace(textArea, { toolbar: "Basic", ignoreEmptyParagraph: true, width: wh, height: ht, enterMode: CKEDITOR.ENTER_BR, shiftEnterMode: CKEDITOR.ENTER_P });
        ////Event Of CKEDITOR
        //CKEDITOR.instances[textArea].on("instanceReady", function (event) {
        //    CKEDITOR.instances[textArea].document.on("contextmenu", function (event) {
        //        event.data.preventDefault();
        //    });
        //});
        //editor.setData("<b>Mô tả nội dung</b>");
        //alert(CKEDITOR.instances.ProductBranchContent.getData());
        //CKFinder.setupCKEditor(null, "../ckfinder/", "Picture", "Picture");
    },

};

var Other = new Other_Class();
