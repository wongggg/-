
var cj={};var qh = {};

//判断是否同一个结果
var checkifexist = function(o1,o2){
        if((o1.x==o2.x && o1.y==o2.y)||(o1.x == o2.y && o1.y == o2.x)){
            return true
        }else{
            return false
        }
}
for(var i=1;i<21;i++){
    for(var b=1;b<21;b++){
        if(b!==i){
            cj[b*i]?'':cj[b*i]=[];
            qh[b+i]?'':qh[b+i]=[];
            var flag2 = false
            var flag = false
            if(cj[b*i].length>0){
                Object.values(cj[b*i]).map(function(k){
                    if(checkifexist(k,{x:b,y:i})){
                        flag = true
                    }
                })
            }
            if(!flag){
                cj[b*i].push({x:b,y:i})
            }
            if(qh[b+i].length>0){
                Object.values(qh[b+i]).map(function(k){
                    if(checkifexist(k,{x:b,y:i})){
                        flag2 = true
                    }
                })
            }
            if(!flag2){
                qh[b+i].push({x:b,y:i})
            }    
        }
    }
}
//去掉只有一个结果的数组,因为第一步不能确定，必有多个结果
var deleteOnce = function(obj){
    Object.keys(obj).map(function(i){
        if(obj[i].length===1){
            delete obj[i]
        }
    })
}

deleteOnce(cj);
deleteOnce(qh);

//求和组中去除在乘积数据中没有的组合
Object.keys(qh).map(function(i){
    for(let k = qh[i].length-1; k>-1;k--){
        if(!cj[(qh[i][k].x*qh[i][k].y)]){
             qh[i].splice(k,1)
             if(qh[i].length==0){
                 delete qh[i]
             }
        }
    }
})

//从乘积数组中去除在求和数据中没有的组合
Object.keys(cj).map(function(i){
    for(let k = cj[i].length-1; k>-1;k--){
        if(!qh[cj[i][k].x+cj[i][k].y]){
             cj[i].splice(k,1)
             if(cj[i].length==0){
                delete cj[i]
            }
        }
    }
})

//找出长度只有1的组合

var results = []
var findOne = function(obj){
    Object.values(obj).map(function(i){
        if(i.length==1){
            results.push(i[0])
        }
    })
}
findOne(qh);findOne(cj)

console.log(results)