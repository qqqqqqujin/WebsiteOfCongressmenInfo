/*sidebar-toggle*/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
       
});



var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.controller("myCtrl", function($scope,$http,$filter){
     $http({
        method: 'GET',
        url: "http://sample-env-1.kkc6kfpbre.us-west-2.elasticbeanstalk.com/",
        params: {data: 'legislators'},
    }).then(function successCallback(response){
         $scope.total = response.data.results.length;

        $scope.ldata = response.data.results;    
     }, function errorCallback(response){
        
    });   
    
    $http({
        method: 'GET',
        url: "http://sample-env-1.kkc6kfpbre.us-west-2.elasticbeanstalk.com/",
        params: {data: 'bills_active'},
    }).then(function successCallback(response){
         

        $scope.bdata_active = response.data.results;    
     }, function errorCallback(response){
        
    });  
    
    $http({
        method: 'GET',
        url: "http://cs-server.usc.edu:20286/index.php",
        params: {data: 'bills_new'},
    }).then(function successCallback(response){
         

        $scope.bdata_new = response.data.results;    
     }, function errorCallback(response){
        
    });
     
    $http({
        method: 'GET',
        url: "http://sample-env-1.kkc6kfpbre.us-west-2.elasticbeanstalk.com/",
        params: {data: 'committees'},
    }).then(function successCallback(response){
         

        $scope.cdata = response.data.results;    
     }, function errorCallback(response){
        
    });
    
    $scope.states = ["Alabama","Alaska","Arkansas","American Samoa","Arizona","California","Colorado","Connecticut","Delaware","District Of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Kouisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Northern Mariana Islands","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","US Virgin Islands","Vermont","Washington","Wisconsin","West Virginia","Wyoming"];
    $scope.details = "NA";
    
    
    
    
     $scope.saved = localStorage.getItem('favs');
    if(localStorage.getItem('favs') !== null)    
        {
            $scope.favs = JSON.parse($scope.saved);
        }
    else{
        $scope.favs = [];
    }
        localStorage.setItem('favs', JSON.stringify($scope.favs));
    
    $scope.view = function(xxx){
           $scope.details = xxx;
            $http({
                method: 'GET',
                url: "http://sample-env-1.kkc6kfpbre.us-west-2.elasticbeanstalk.com/",
                params: {data: 'committees_5', id: xxx},
            }).then(function successCallback(response){


                $scope.c5data = response.data.results;    
             }, function errorCallback(response){

            }); 
            
            $http({
                method: 'GET',
                url: "http://sample-env-1.kkc6kfpbre.us-west-2.elasticbeanstalk.com/",
                params: {data: 'bills_5', id: xxx},
            }).then(function successCallback(response){

                $scope.b5data = response.data.results;    
             }, function errorCallback(response){

            }); 
            
            $scope.nowview = $filter('filter')($scope.ldata, xxx);
            
            
            
       
    
    var count=0;
    angular.forEach($scope.favs,function(i){
        if(i.bioguide_id == xxx) {
            count +=1;
        }
            
    });
    
    
    $scope.star = function(){
        
        
        
        if(count == 0){
            $scope.favs.push($scope.nowview[0]);
            localStorage.setItem('favs', JSON.stringify($scope.favs));
            count += 1;
        }
        else{
            var oldfavs = $scope.favs;
            $scope.favs = [];
            var index = 0;
            for(var i = 0; i < oldfavs.length; i++){
                if(oldfavs[i].bioguide_id != xxx){
                    $scope.favs.push(oldfavs[i]);
                }
            }

            count -= 1;
            localStorage.setItem('favs', JSON.stringify($scope.favs));
        }
        
    }
    

    
    
    
            
       };
    
    $scope.savedB = localStorage.getItem('favsB');
        if(localStorage.getItem('favsB') !== null)    
        {
            $scope.favsB = JSON.parse($scope.savedB);
        }
    else{
        $scope.favsB = [];
    }
        localStorage.setItem('favsB', JSON.stringify($scope.favsB));
    
$scope.view_b = function(xxx){
        $scope.billid = xxx;
        
        $scope.nowviewB = $filter('filter')($scope.bdata_active, xxx).length == 0 ? $filter('filter')($scope.bdata_new, xxx) : $filter('filter')($scope.bdata_active, xxx);
        
//    $scope.favsB=[];
//    $scope.favsB.push($scope.nowviewB[0]);
    
        
    
    var count=0;
    angular.forEach($scope.favsB,function(i){
        if(i.bill_id == xxx) {
            count +=1;
        }
            
    });
    
    
    $scope.star_b = function(){
        
        if(count == 0){
            $scope.favsB.push($scope.nowviewB[0]);
            localStorage.setItem('favsB', JSON.stringify($scope.favsB));
            count += 1;
        }
        else{
            var oldfavsB = $scope.favsB;
            $scope.favsB = [];
            
            for(var i = 0; i < oldfavsB.length; i++){
                if(oldfavsB[i].bill_id != xxx){
                    $scope.favsB.push(oldfavsB[i]);
                }
            }

            count -= 1;
            localStorage.setItem('favsB', JSON.stringify($scope.favsB));
        }
        
    }
    

}




$scope.savedC = localStorage.getItem('favsC');
        if(localStorage.getItem('favsC') !== null)    
        {
            $scope.favsC = JSON.parse($scope.savedC);
        }
    else{
        $scope.favsC = [];
    }
        localStorage.setItem('favsC', JSON.stringify($scope.favsC));

    
    
    $scope.star_c = function(xxx){
        var count=0;
    angular.forEach($scope.favsC,function(i){
        if(i.committee_id == xxx) {
            count +=1;
        }
            
    });
        $scope.cid = xxx;
    
    $scope.nowviewC = $filter('filter')($scope.cdata,xxx);
        if(count == 0){
            $scope.favsC.push($scope.nowviewC[0]);
            localStorage.setItem('favsC', JSON.stringify($scope.favsC));
            count += 1;
        }
        else{
            var oldfavsC = $scope.favsC;
            $scope.favsC = [];
            
            for(var i = 0; i < oldfavsC.length; i++){
                if(oldfavsC[i].committee_id != xxx){
                    $scope.favsC.push(oldfavsC[i]);
                }
            }

            count -= 1;
            localStorage.setItem('favsC', JSON.stringify($scope.favsC));
        }
        
    }
    
    



//    $scope.idd = iddd;
//    localStorage.setItem('favsC',JSON.stringify([]));
        
   
    
        $scope.term = function(a,b){
            var start_y = parseInt(a.slice(0,4));
            var start_m = parseInt(a.slice(5,7));
            var start_d = parseInt(a.slice(8,10));
            var end_y = parseInt(b.slice(0,4));
            var end_m = parseInt(b.slice(5,7));
            var end_d = parseInt(b.slice(8,10));
            var now = new Date();
            var now_y = now.getFullYear();
            var now_m = now.getMonth()+1;
            var now_d = now.getDate();
            return Math.floor((((now_y-start_y)*365+(now_m-start_m)*30+(now_d-start_d))/((end_y-start_y)*365+(end_m-start_m)*30+(end_d-start_d)))*100);
        };
    
    $scope.legiShow = true;
    $scope.billShow = false;
    $scope.comShow = false;
    $scope.favShow = false;
    
    $scope.legiClick = function(){
        $scope.legiShow = true;
        $scope.billShow = false;
        $scope.comShow = false;
        $scope.favShow = false;
    }
    $scope.billClick = function(){
        $scope.legiShow = false;
        $scope.billShow = true;
        $scope.comShow = false;
        $scope.favShow = false;
    }
    $scope.comClick = function(){
        $scope.legiShow = false;
        $scope.billShow = false;
        $scope.comShow = true;
        $scope.favShow = false;
    }
    $scope.favClick = function(){
        $scope.legiShow = false;
        $scope.billShow = false;
        $scope.comShow = false;
        $scope.favShow = true;

    }
    
    $scope.removel = function(xxx){
        var oldfavs = $scope.favs;
            $scope.favs = [];
            
            for(var i = 0; i < oldfavs.length; i++){
                if(oldfavs[i].bioguide_id != xxx){
                    $scope.favs.push(oldfavs[i]);
                }
            }
            localStorage.setItem('favs', JSON.stringify($scope.favs));
        
    }
    
    $scope.favdetails = function(xxx){
        $scope.legiShow = true;
        $scope.billShow = false;
        $scope.comShow = false;
        $scope.favShow = false;
        
        $scope.view(xxx);
        
    }
    
    $scope.removeb = function(xxx){
        var oldfavsB = $scope.favsB;
            $scope.favsB = [];
            
            for(var i = 0; i < oldfavsB.length; i++){
                if(oldfavsB[i].bill_id != xxx){
                    $scope.favsB.push(oldfavsB[i]);
                }
            }
            localStorage.setItem('favsB', JSON.stringify($scope.favsB));
        
    }
    $scope.favdetailsB = function(xxx){
        $scope.legiShow = false;
        $scope.billShow = true;
        $scope.comShow = false;
        $scope.favShow = false;
        
        $scope.view_b(xxx);
    }
    $scope.removec = function(xxx){
        var oldfavsC = $scope.favsC;
            $scope.favsC = [];
            
            for(var i = 0; i < oldfavsC.length; i++){
                if(oldfavsC[i].committee_id != xxx){
                    $scope.favsC.push(oldfavsC[i]);
                }
            }

            localStorage.setItem('favsC', JSON.stringify($scope.favsC));
        
    }
});