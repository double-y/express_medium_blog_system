/**
 * Created by yasudayousuke on 11/2/15.
 */
$(function(){
    var editorStorageName = "editorStorage";
    localStorage[editorStorageName] = JSON.stringify([])
    if(!localStorage[editorStorageName]){
        localStorage[editorStorageName] = JSON.stringify([]);
    }else{
        JSON.parse(localStorage[editorStorageName]).forEach(function(editorJson, index){
            addDomToArticleList(editorJson, index);
        });
    }

    var articleEditorListArray = JSON.parse(localStorage[editorStorageName]);
    var currentListNumber;

    $(document).on('click','input#blog_form_submit_input', function(e){
        e.preventDefault();
        var trix_element = document.querySelector("trix-editor#blog_editor");
        articleEditorListArray.push(trix_element.editor);
        localStorage[editorStorageName] = JSON.stringify(articleEditorListArray);
        addDomToArticleList(JSON.parse(JSON.stringify(trix_element.editor)));
    });

    $(document).on('click', 'li.trix-blog', function(){
        var this_list_number = this.getAttribute('list-id');
        if(this_list_number != currentListNumber){
            this.innerHTML = this.innerHTML + '<div class="torix_editor"><form><trix-editor></trix-editor><input type="submit" value="update"/></form></div>';
            currentListNumber = this_list_number;
        }
    });
});

function addDomToArticleList(editorJson, list_id){
    var article_ul_dom = document.querySelector("#article_ul");
    var trix_parser_dom = document.querySelector("trix-editor#trix_parser");
    trix_parser_dom.editor.loadJSON(editorJson);
    var editorHtml = trix_parser_dom.innerHTML;
    var li_html = '<li class="trix-blog" list-id="' + list_id + '"><div class="trix-content">'+ editorHtml +'</div></li><hr/>';
    article_ul_dom.innerHTML += li_html;
}