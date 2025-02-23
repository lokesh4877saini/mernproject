class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};
        // console.log(keyword)
        this.query = this.query.find({ ...keyword })
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr}
        // Removing some fields for category
        const removeFields = ["keyword","page",'limit'];
        removeFields.forEach((key )=> delete queryCopy[key]);

        // filter for price 
        // converting  obj into string 
        let queryStr = JSON.stringify(queryCopy) 
        // again string into obj
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) =>`$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }
    pagination(resultPerPage){
        // console.log("Pagination called")
        const currentPage = Number(this.queryStr.page) || 1; 
        const skip = resultPerPage * (currentPage - 1)
        // console.log(skip)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

// module.exports = ApiFeatures;
// class ApiFeatures {
//     constructor(query, queryStr) {
//         this.query = query; // This is the base query (e.g., Product.find())
//         this.queryStr = queryStr; // Query parameters from the request
//         this.queryConditions = {}; // To accumulate all filters
//     }

//     search() {
//         if (this.queryStr.keyword) {
//             const keyword = {
//                 name: {
//                     $regex: this.queryStr.keyword,
//                     $options: "i"
//                 }
//             };
//             this.queryConditions = { ...this.queryConditions, ...keyword }; // Merge conditions
//         }
//         return this;
//     }

//     filter() {
//         const queryCopy = { ...this.queryStr };
//         const removeFields = ["keyword", "page", "limit"];
//         removeFields.forEach(key => delete queryCopy[key]);

//         // Parse query operators like gte, lte
//         let queryStr = JSON.stringify(queryCopy);
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
//         const parsedConditions = JSON.parse(queryStr);

//         this.queryConditions = { ...this.queryConditions, ...parsedConditions }; // Merge conditions
//         return this;
//     }

//     pagination(resultPerPage) {
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resultPerPage * (currentPage - 1);

//         // Apply pagination
//         this.query = this.query.skip(skip).limit(resultPerPage);
//         return this;
//     }

//     buildQuery() {
//         this.query = this.query.find(this.queryConditions); // Apply all conditions to the query
//         return this;
//     }
// }

module.exports = ApiFeatures;
