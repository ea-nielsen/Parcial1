
fetch(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  )
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(Object.keys(data))
        const keys = 0

        for(k in keys){
        }
        
        const card2 = document.getElementById("t")
        card2.addEventListener("click",function(event){
            event.preventDefault();
            card(1);
        })
        
        const card3 = document.getElementById("s")
        card3.addEventListener("click",function(event){
            event.preventDefault();
            card(2);
        })
        
        const card4 = document.getElementById("d")
        card4.addEventListener("click",function(event){
            event.preventDefault();
            card(3);
        })
        
        const card5 = document.getElementById("ds")
        card5.addEventListener("click",function(event){
            event.preventDefault();
            card(4);
        })
        
        function card(index){
            const div = document.getElementById("card");
            let tittle = document.createElement("");
         }

    });
