const express = require("express");
const router = express.Router();
const productsController =require("../controllers/product.controller");
const limiter = require("../middleware/limiter.js");
const viewCount = require("../middleware/viewCount.js");

// router.get("/", (req, res) => {
//   res.send("get product");
// });
// router.post("/", (req, res) => {
//   res.send("added product");
// });
/**
 * @api {get} /products all products
 * @apiDescription get all products
 * @apiPermission admin and users
 * 
 * @apiHeader {string} Authorization user's access token
 * 
 * @apiParam {number {1-}}      [page=1]     list page
 * @apiParam {number {1-100}}   [limit=10]   user per page
 * 
 * @apiSuccess {object[]} all the products
 * 
 * @apiError (unauthorized 401)  unauthorized only authorized users can access the products
 * @apiError (forbidden 403) forbidden only authorized users can access the products
 */

router
  .route("/")
  /**
 * @api {get} /products all products
 * @apiDescription get all products
 * @apiPermission admin and users
 * 
 * @apiHeader {string} Authorization user's access token
 * 
 * @apiParam {number {1-}}      [page=1]     list page
 * @apiParam {number {1-100}}   [limit=10]   user per page
 * 
 * @apiSuccess {object[]} all the products
 * 
 * @apiError (unauthorized 401)  unauthorized only authorized users can access the products
 * @apiError (forbidden 403) forbidden only authorized users can access the products
 */
  .get(productsController.getAllProducts)
  /**
 * @api {post} /products all products
 * @apiDescription get all products
 * @apiPermission admin and users
 * 
 * @apiHeader {string} Authorization user's access token
 * 
 * @apiParam {number {1-}}      [page=1]     list page
 * @apiParam {number {1-100}}   [limit=10]   user per page
 * 
 * @apiSuccess {object[]} all the products
 * 
 * @apiError (unauthorized 401)  unauthorized only authorized users can access the products
 * @apiError (forbidden 403) forbidden only authorized users can access the products
 */
  .post(productsController.saveProducts);

  router.route("/:id").get(viewCount,limiter, productsController.specificProducts)
  .patch(productsController.updateProducts)
  .delete(productsController.deleteProducts)
module.exports = router;
