//Fonction qui affiche la position des sondes sur la carte

$(document).ready(function() {
    GetProbe_pos();
});

function testdelay(){
    console.log("Une action")
}

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
                    var id_probes= new Array
                    id_probes.push(i)
                    DispProbe_pos(i,data[i]['name'],data[i]['pos_x'],data[i]['pos_y'],data[i]['active'])
                }
               //DispProbe_measure(id_probes)
            },
            error: function(){
                console.log("failed to acquire probes localisations");
            },
            dataType:'json',            
        });

    }

    /*function DispProbe_measure(id_probes)
    {

        $.ajax({
            type:"GET",
            for(j=0;j<id_probes.length;j++){
            url:"http://10.176.129.94:5000/atmos/measure/last/"+id_probes[j]
            }
            headers:{"Access-Control-Allow-Header": "*"},
            success: function(data_measure){
                console.log(data_measure)
            },
            error: function(){
                console.log("failed to acquire probes measures")
            },
            dataType:'json',            
        });

    }*/


function DispProbe_pos(id_probe,name,pos_x,pos_y,isactive)
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