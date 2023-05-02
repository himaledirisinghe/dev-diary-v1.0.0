Previous code for POST request for older versions of mongoose
---

```javascript
//save posts
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);
  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Post Saved Successfully",
    });
  });
});
```
Latest code for POST request for mongoose 7.1.0
---

```javascript
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);
  newPost.save()
    .then(() => {
      return res.status(200).json({
        success: "Post Saved Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});
```
Error in Terminal:
---

(node:1040) UnhandledPromiseRejectionWarning: MongooseError: Model.prototype.save() no longer accepts a callback at model.save (E:\MERN Stack\mernCrud\node_modules\mongoose\lib\model.js:496:11) at E:\MERN Stack\mernCrud\routes\posts.js:9:11 at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5) at next (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:144:13) at Route.dispatch (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:114:3) at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5) at E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:284:15 at Function.process_params (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:346:12) at next (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:280:10) at Function.handle (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:175:3) (Use `node --trace-warnings ...` to show where the warning was created) (node:1040) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1) (node:1040) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

Solution:
---

This error message indicates that the `save()` method of a Mongoose model no longer accepts a callback function as an argument. Instead, you should use the `then()` and `catch()` methods of the returned promise to handle the result of the save operation. Here's an example of how you can update your code to fix this error:

```javascript
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);
  newPost.save()
    .then(() => {
      return res.status(200).json({
        success: "Post Saved Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});
```

This code creates a new `Posts` document using the request body and saves it to the database using the `save()` method. The `then()` method is used to handle a successful save operation, returning a `200` status code and success message in the response. The `catch()` method is used to handle any errors that occur during the save operation, returning a `400` status code and error message in the response.

Previous code for GET request
---

```javascript
//get posts
router.get("/posts", (req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  });
});
```

Updated code for GET request
---

```javascript
router.get("/posts", (req, res) => {
  Posts.find()
    .then((posts) => {
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});
```

Error in Terminal
---

(node:11080) UnhandledPromiseRejectionWarning: MongooseError: Query.prototype.exec() no longer accepts a callback
    at model.Query.exec (E:\MERN Stack\mernCrud\node_modules\mongoose\lib\query.js:4299:11)     
    at E:\MERN Stack\mernCrud\routes\posts.js:25:16
    at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5)
    at next (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:144:13)
    at Route.dispatch (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:114:3)   
    at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5)
    at E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:346:12)
    at next (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:280:10)
    at Function.handle (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:175:3)  
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11080) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:11080) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

Previous code for PUT request
---
```javascript
//update posts
router.put("/post/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, { $set: req.body, },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});
```
Updated code for PUT request
---

```javascript
router.put("/post/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((post) => {
      return res.status(200).json({
        success: "Updated Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});
```

Error in Terminal
---
MongooseError: Model.findByIdAndUpdate() no longer accepts a callback
    at Function.Model.findByIdAndUpdate (E:\MERN Stack\mernCrud\node_modules\mongoose\lib\model.js:2499:11)
    at E:\MERN Stack\mernCrud\routes\posts.js:41:9
    at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5)
    at next (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:144:13)
    at Route.dispatch (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:114:3)   
    at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5)
    at E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:284:15
    at param (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:365:14)
    at param (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:376:14)
    at Function.process_params (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:421:3)

Previous code for DELETE request
---
```javascript
//delete post
router.delete("/post/delete/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deletedPost,
    });
  });
});
```
Updated code for DELETE request
---
```javascript
router.delete("/post/delete/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id)
    .then((deletedPost) => {
      return res.json({
        message: "Delete Successfull",
        deletedPost,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    });
});
```
Error in Terminal
---
(node:7688) UnhandledPromiseRejectionWarning: MongooseError: Query.prototype.exec() no longer accepts a callback
    at model.Query.exec (E:\MERN Stack\mernCrud\node_modules\mongoose\lib\query.js:4299:11)     
    at E:\MERN Stack\mernCrud\routes\posts.js:54:42
    at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5)
    at next (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:144:13)
    at Route.dispatch (E:\MERN Stack\mernCrud\node_modules\express\lib\router\route.js:114:3)   
    at Layer.handle [as handle_request] (E:\MERN Stack\mernCrud\node_modules\express\lib\router\layer.js:95:5)
    at E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:284:15
    at param (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:365:14)
    at param (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:376:14)
    at Function.process_params (E:\MERN Stack\mernCrud\node_modules\express\lib\router\index.js:421:3)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:7688) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:7688) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
