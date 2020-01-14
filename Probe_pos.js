//Fonction qui affiche la position des sondes sur la carte

$(document).ready(function() {
    GetProbe_pos();
});


function GetProbe_pos()
    {

        $.ajax({
            type:"GET",
            url:"http://10.176.129.94:5000/atmos/probe/",
            headers:{"Access-Control-Allow-Header": "*"},
            success: function(data){
                console.log(data);
                for(i=0;i<data.length;i++)
                {
                    DispProbe_pos(data[i]['name'],data[i]['pos_x'],data[i]['pos_y'],data[i]['active'])
                }
            },
            error: function(){
                console.log("failed to acquire data");
            },
            dataType:'json',            
        });

    }

function DispProbe_pos(name,pos_x,pos_y)
  {
    L.marker([pos_x, pos_y],{})
      .bindPopup('<b>' +"Probe name :"+name+'</b>')
      .addTo(mymap);
  }