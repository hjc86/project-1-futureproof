$(document).ready(function(){

    console.log("dom is ready")
    function addIdToButton(nodeLists){
        var list = document.getElementsByClassName("toggleComments");
        let i=0;
        for (let item of list) {
            let att = document.createAttribute("id");   
            att.value = i++
            item.setAttributeNode(att)
        }
    }

    addIdToButton([document.getElementsByClassName("toggleComments")])

    function getGIF(userQuery,offset){
        const key = "6X4aryqB9MRq0HmQ80Eh3GBw22RcLCx6";
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${userQuery}&limit=5&offset=${offset}&rating=G&lang=en`)
        .then(data => {
            const parsedGIPHYData = JSON.parse(data.request.responseText)
            for (let i=0; i < 5; i++){
                console.log(parsedGIPHYData.data[i].images.fixed_height_small.url)
                $(`#gif${i+1}`).prop("src", parsedGIPHYData.data[i].images.fixed_height_small.url)
                $(`#gif${i+1}`).prop("alt", parsedGIPHYData.data[i].title)
            }
        })
    }

    function toggleComments(n){
        let x=$(".comments")[n];
        console.log($(x).css('display'))
        
        if($(x).css('display') === 'none') {
            $(x).css('display', "block");
        }
        else if($(x).css('display')=== "block"){
            $(x).css('display', "none");
         }
    }

 

    let offset = 0
    $("#gifSearch").click(event => {
        
        event.preventDefault();
        console.log("make it so")
        
        let userQuery = $("#gif").val();
        
        getGIF(userQuery, offset)
        console.log(userQuery)
    })

    $("#loadMore").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        offset += 5
        console.log(offset)
        getGIF(userQuery, offset)
        console.log(userQuery)
    })
    
    $(".selectable").selectable({
        selected: function( event, ui ){
            const urlOfSelected = ui.selected.src;
            const altOfSelected = ui.selected.alt
            console.log(urlOfSelected)
            $("#selectedGifURL").val(urlOfSelected)
            $("#selectedGifALT").val(altOfSelected)
        }
    });

    $(".toggleComments").click(function() { 
        var t = $(this).attr('id');
        toggleComments(t)
        if($(this).text()==="Show Comments"){
            $(this).text("Hide Comments")
        }
        else if($(this).text()==="Hide Comments"){
            $(this).text("Show Comments")
        }
    });  

    $(".addComment").click(function(event) {
    //$("#addCommen").click(function(event) {
     
        event.preventDefault();
        console.log("you clicked the button")

        let id= $(this).siblings("#ID").val()
        let comment=$(this).siblings("#comment").val()

        console.log("using $this", $(this).siblings("#ID").val())
        console.log("using $this", $(this).siblings("#comment").val())
        
        axios({
            method: 'POST',
            url: '/addComment',
            data: {
                'ID': id,
                'comment':comment
            }
        }).
        then(response=>{
            axios({
                method: 'POST',
                url: '/comments',
                data: {
                    'ID': id,
                }
            })
            .then(response=>{
                $(`input[value=${id}]`).parentsUntil("section").find("textArea").val("");
                $(`input[value=${id}]`).parentsUntil("section").find(".comments").append(`<p class=comment>${response.data}</p>`)
            })
        })

    })

})
