load('/Users/lthompson/.underscore-min.js')

function getAllDatabases(){
    var dbs = []
    var databaseList = db.adminCommand('listDatabases')
    for (i in databaseList.databases){
        var databaseName = databaseList.databases[i].name
        if (databaseName != "local" && databaseName != "admin"){
            dbs.push(db.getSiblingDB(databaseList.databases[i].name))
        }
    }
    return dbs
}
function profileForSeconds(seconds, allDbs){
    var dbsToRunOn = []
    if (allDbs){
        dbsToRunOn = getAllDatabases()
    }else{
        dbsToRunOn = [db]
    }
    dbsToRunOn.forEach(function(database){
        database.setProfilingLevel(2);
    })
    sleep(seconds * 1000)
    var activityDocuments = {
        databasesWithNoActivity : ""
    }
    dbsToRunOn.forEach(function(database){
        var ago = new Date(new Date().getTime() - (seconds * 1000))
        var activityByCollection = database.system.profile.aggregate([{$match:{ts: {$gte: ago}, ns: {$nin: [/^admin/i, /.*\.system\.profile$/i, /.*\.system\.indexes$/i]}}}, {$group: {_id:"$ns", count: {$sum:1}}}, {$sort: {count:-1}}]).result
        var activity = {}
        if (activityByCollection.length==0){
            if (activityDocuments.databasesWithNoActivity.length > 0){
                activityDocuments.databasesWithNoActivity += ", "
            }
            activityDocuments.databasesWithNoActivity+=database.getName()
        }else{
            for (i in activityByCollection){
                var collectionName = activityByCollection[i]._id
                var collectionActivityCount = activityByCollection[i].count
                activity[collectionName] = collectionActivityCount
            }
            activityDocuments[database.getName()]=activity
        }
        database.setProfilingLevel(0)
    })
    print(activityDocuments)
}
