
$(function () {
    var map = $('#map').vectorMap({
        map: 'it_merc', zoomButtons: false, backgroundColor: '#F3F4FA', panOnDrag: false, zoomOnScroll: false, scale: 50,
        onRegionClick: function (event, code) {
        },
        regionStyle: {
            initial: {
                fill: '#B8E186'
            },
            hover: {
                "fill-opacity": 0.8,
                cursor: 'pointer'
            }
        },
        onRegionTipShow: function(e, el, code){
            var result;
                
                var socket = io.connect('http://localhost:8080');
                socket.on("connect", function () {
                var map = $('#map').vectorMap('get', 'mapObject');
                    var regionName = map.getRegionName(code);
                    socket.emit("NomeProvincia", regionName);
                    socket.on('risultato', function (data) {
                        if (data == null) { 
                            alert("nullo provincia"); 
                        } else { 
                            //data è un singolo array
                            result = data[data.length - 1];
                            //alert(result);
                            el.html('<div id="tip">' + "PROVINCIA DI " + (el.html()).toUpperCase() + '</div><br><br><div id="tip2">TOTALE CASI DA INIZIO PANDEMIA</div><div id="tip3">' + String(result) + '</div>').css({"backgroundColor" : "rgba(255, 255, 255, 0.9)", 
                "border-radius" : "5px", "border-color" : "rgba(255, 255, 255, 0.0)", "box-shadow" : "0px 0px 11px 2px rgba(235,235,235,1)"});
                        }
                        
                    });
    
                });
                //alert(result);
        },
        
    });
    var mapObj = $("#map").vectorMap("get", "mapObject");
    var zoomSettings = { scale: 7.8, lat: 40.75, lng: 14.80, animate: false };
    mapObj.setFocus(zoomSettings);
});

var height = document.getElementsByClassName("header")[0].offsetHeight;
document.getElementsByClassName("regione")[0].style.marginTop = height+"px";
window.scrollTo(0, 0);




