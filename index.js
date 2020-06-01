var neo4j = require('neo4j-driver');

var driver = neo4j.driver(process.env.GRAPHENE_URL,
    neo4j.auth.basic(process.env.GRAPHENE_USER, process.env.GRAPHENE_PASS), { encrypted: "ENCRYPTION_OFF" });

var session = driver.session();

session
    .run("MATCH (:Person {name: 'Tom Hanks'})-[:ACTED_IN]->(movies) RETURN movies.title AS title")
    .subscribe({
        onNext: function (record) {
            console.log(record.get('title'));
        },
        onCompleted: function () {
            session.close();
        },
        onError: function (error) {
            console.log(error);
        }
    });
