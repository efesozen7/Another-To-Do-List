//General operations are being controller
const todoController = (function(){
    
})();
//UI operations are being controlled
const uiController = (function(){
    let id = 0;
    let score = 0; 
    return {
        readInput: function(){
            return{
            input: document.querySelector('.add__description').value
            };
        },

        addToList: function(input){
            
            const html = `<div class='item clearfix' id='goal-${id}'><div class='item__description'>&Goal&</div><div class='right clearfix'><div class='item__done'><button class='item__done--btn'><i class='ion-ios-checkmark-outline'></i></button></div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>`;
            id++;
            let newHtml = html.replace("&Goal&", input);
            document.querySelector('.todo__list').insertAdjacentHTML("beforeend",newHtml);
            document.querySelector(".add__description").value = "";
            document.querySelector(".add__description").focus();    
            

        },
        deleteDuty: function(event){
            if(event.target.className === "ion-ios-close-outline"){
                let idArr = (event.target.parentNode.parentNode.parentNode.parentNode.id.split('-'));
                let id = idArr[1];
                document.getElementById(`goal-${id}`).parentNode.removeChild(document.getElementById(`goal-${id}`));
            }
        },
        addToDoneList: function(event){
            if(event.target.className === "ion-ios-checkmark-outline"){
                //const html = `<div class='item clearfix' id='goal-${id}'><div class='item__description'>&Goal&</div><div class='right clearfix'></div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>`;
                let idArr = (event.target.parentNode.parentNode.parentNode.parentNode.id.split('-'));
                let id = idArr[1];
                document.querySelector('.done__list').insertAdjacentElement("beforeend",document.getElementById(`goal-${id}`));
                document.querySelector(`#goal-${id}`).children[1].children[0].innerHTML = "";
                score++;
            }
        },
        updateScore : function(){

            document.querySelector('.goals').innerHTML = `Daily Duty Goal: ${score}/5`;
            if(score===5){
                document.querySelector('.goals').innerHTML = `Daily Duty Goal: ${score}/5 -- You have reached your goal!`;
            }else if(score > 5){
                document.querySelector('.goals').innerHTML = `Daily Duty Goal: ${score}/5 -- You have exceeded your goal!`;
            }

        }
    };
})();


//Both todoController and UIController are being controlled
const allController = (function(todoControl, uiControl){
    
    //eventListener for the button to add DUTY
    document.querySelector(".add__btn").addEventListener('click', function(){
        //input taken from the UI
        const input = uiControl.readInput();
        //is the input empty or not?
        if(input.input !== ""){
            //addToList
            uiControl.addToList(input.input);
        }
    });
    
    // Delete already created DUTY Object
    document.querySelector('.container').addEventListener('click', function(event){
        uiControl.deleteDuty(event);
        uiControl.addToDoneList(event);
        uiControl.updateScore();
    });
    
   

})(todoController,uiController);
