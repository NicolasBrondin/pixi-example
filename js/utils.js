var utils = { 
    load_file: function(file, callback){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if(request.readyState === 4) {
            if(request.status === 200) { 
              callback(JSON.parse(request.responseText));
            } else {
              console.error('An error occurred during your request: ', request.status + ' ' + request.statusText);
            } 
          }
        }
 
        request.open('Get', file, true);
        request.send();
    },
    toRad: function(deg){
        return (deg/180)*Math.PI;
    },
    toDeg: function(rad){
        return (rad / Math.PI) * 180;
    }
};