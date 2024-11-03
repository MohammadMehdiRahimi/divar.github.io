/**
 * @swaager
 * name: Category
 * description : category Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *          createCategory:
 *                type: object
 *                properties:
 *                      name:
 *                            type: string
 *                      icon:
 *                            type: string
 *                      slug:
 *                            type: string
 *                      parent:
 *                            type: string
 *                required:
 *                      - name
 *                      - icon
 *
 */
/**
 * @swagger
 * /category:
 *    post:
 *          summery: create new category
 *          tags:
 *            - Category
 *          requestBody:
 *                content:
 *                      application/x-www-form-urlencoded:
 *                            schema:
 *                                  $ref: '#/components/schemas/createCategory'
 *                      application/json:
 *                            schema:
 *                                  $ref: '#/components/schemas/createCategory'
 *          response:
 *              description: create user successfully
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *
 */

/**
 * @swagger
 * /category:
 *    get:
 *          summery: get All categories
 *          tags:
 *            - Category
 *          responses:
 *             200:
 *              description: get user successfully
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *
 */
