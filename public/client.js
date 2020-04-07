window.addEventListener('DOMContentLoaded', (event) => {
    
    $("#gifSearch").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        getGIF(userQuery)
        console.log(userQuery)
    })


    function getGIF(userQuery){
        const key = "6X4aryqB9MRq0HmQ80Eh3GBw22RcLCx6";
        /* let usedQuery = query.replace(" ", "&"); */
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${userQuery}&limit=25&offset=0&rating=G&lang=en`)
        .then(data => {
            /* data.request.response */
            console.log(data.request.response)
        })
    }

    function setToHidden(nodeLists){
        let ids=nodeLists[0]
        ids.forEach(element => {
            if(element.type !== "file"){
                element.hidden=true;
            };
        })
    }
    
    var idInputs=document.getElementsByName("ID")
    setToHidden([idInputs])


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

    $("button").click(function() { 
        var t = $(this).attr('id'); 

        toggleComments(t)

        if($(this).text()==="Show Comments"){
            $(this).text("Hide Comments")
        }
        else if($(this).text()==="Hide Comments"){
            $(this).text("Show Comments")
        }
    
    });  

})