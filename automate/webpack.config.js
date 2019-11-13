module.exports = {
    entry:"./webpack/main.ts",
    output: {
        filename:"./bundle.js",
        // REMENBER: change path to your current code base:
        path: "/home/baselaunch/automate/webpack/app"
    },
    //devtool:"source-map",
    resolve: {
        extensions: ["*",".ts",".tsx",".js"]
    },
    module:{
        rules: [
            {test:/\.tsx?$/, loader:"ts-loader"}
        ]
    }
};
