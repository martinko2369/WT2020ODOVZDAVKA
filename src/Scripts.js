function opinion2html(opinion){



    opinion.createdDate=(new Date(opinion.created)).toDateString();

    const template = document.getElementById("template").innerHTML;
    const htmlWOp = Mustache.render(template,opinion);

    delete(opinion.createdDate);
    delete(opinion.willReturnMessage);

    return htmlWOp;


}
function clean(){
    let opinionsElm=document.getElementById("opinionsContainer");
    delete(localStorage.myComments);

}
function opinionArray2html(sourceData){


    return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ opinion2html(opn),"");
}

let opinions=[];

const opinionsElm=document.getElementById("opinionsContainer");
if(localStorage.myComments){
    opinions=JSON.parse(localStorage.myComments);
}

opinionsElm.innerHTML=opinionArray2html(opinions);


let commFrmElm=document.getElementById("myForm");

commFrmElm.addEventListener("submit",processOpnFrmData);

function processOpnFrmData(event){
    event.preventDefault();

    const inputs = document.getElementById("myForm").elements;
    const nopName = inputs.namedItem("nameElm").value;
    const nopOpn = inputs.namedItem("opnElm").value.trim();
    const email = inputs.namedItem("emailElm").value.trim();
    const url = inputs.namedItem("url").value.trim();
    const LikesLexus = inputs.namedItem("Lexus").checked;
    const LikesBMW = inputs.namedItem("BMW").checked;
    const LikesJag = inputs.namedItem("Jaguar").checked;
    const keywords = inputs.namedItem("keywords").value.trim().split(" ");
    let palivo = null;
    const specifiacation = inputs.namedItem("palivo");
    for (let i = 0; i<specifiacation.length; i++){
        if(specifiacation[i].checked) palivo = specifiacation[i].value;
    }
    if(nopName=="" || nopOpn==""){
        window.alert("Please, enter both your name and opinion");
        return;
    }
    const newOpinion =
        {
            name: nopName,
            comment: nopOpn,
            email : email,
            url : url,
            palivo : palivo,
            LikesLexus: LikesLexus,
            LikesBMW : LikesBMW,
            LikesJag : LikesJag,
            keywords : keywords,
            created: new Date()
        };


    opinions.push(newOpinion);
    localStorage.myComments = JSON.stringify(opinions);
    opinionsElm.innerHTML+=opinion2html(newOpinion);


    commFrmElm.reset(); 
