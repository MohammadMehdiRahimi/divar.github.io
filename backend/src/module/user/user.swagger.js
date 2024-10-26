/**
 * @swagger
 * tags:
 *  name: User
 *  description: User model and routes
 */

/* -------------------------- start schemas section ------------------------- */

/**
 * @swagger
 * components:
 *  schemas:
 *      whoami:
 *          type: object
 */

/* ------------------------- start get user details endpoint ------------------------- */
/**
 * @swagger
 * /user/whoami:
 *  get:
 *      summary: get user profile
 *      tags:
 *          - User
 *      responses:
 *          200:
 *              description: get user successfully
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *
 *          401:
 *              description: Unauthorized - Invalid Credentials
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *
 *
 *          500:
 *              description: Internal Server Error
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *
 */
