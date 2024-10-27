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
 *                required:
 *                      - name
 *                      - icon
 *                properties:
 *                      name:
 *                            type: string
 *                      icon:
 *                            type: string
 *                      slug:
 *                            type: string
 *                      parent:
 *                            type: string
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
 *                description: successfully
 *
 */
