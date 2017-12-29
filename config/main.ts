const config  = {
    // server port
    port : 4000,
    encryp_secret : "secretomaximoenelmundo",
    //jwt claims
    jwtOptions : {
        aud: 'http://xxx.xxx.xxx.xxx',
        iss: 'jrivera'
      },
    // connectionString
    db: {
        mysql: {
            dev: {
                type: "mysql",
                host: "201.217.241.114",
                port: 3306,
                username: "ipeters",
                password: "1212",
                database: "apprende"
            },
            prd: ""
        }
    }
};

export default config;