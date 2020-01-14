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

function DispProbe_pos(name,pos_x,pos_y,isactive)
  { 
    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      if(isactive==1)
      {
        L.marker([pos_x, pos_y],{icon: greenIcon})
        .bindPopup('<b>' +"Probe name :"+name+'</b>')
        .addTo(mymap);
      }
      else
      {
        L.marker([pos_x, pos_y],{icon: redIcon})
        .bindPopup('<b>' +"Probe name :"+name+'</b>')
        .addTo(mymap);
      }
   
  }