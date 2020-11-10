export const configCkeditor = () => {
  let config = {
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
    width: "auto",
    height: "400px",
    extraPlugins: 'image2,codemirror,embed,autoembed,youtube,pastefromgdocs',
    contentsCss: ['/bootstrap/bootstrap3/css/bootstrap.min.css', '/ckeditor/contents.css'],
    embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&api_key=4cbe3d04773cb1a322d670&callback={callback}',
    youtube_responsive: true,
    image2_disableResizer: false
  }
  return config
}
