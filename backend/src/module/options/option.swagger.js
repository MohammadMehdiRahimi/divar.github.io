/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option module and Routes
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    createOption:
 *          type: object
 *          required:
 *           - title
 *           - key
 *           - category
 *           - type
 *          properties:
 *                title:
 *                      type: string
 *                key:
 *                      type: string
 *                category:
 *                      type: string
 *                guid:
 *                      type: string
 *                type:
 *                      type: string
 *                      enum:
 *                            - number
 *                            - string
 *                            - boolean
 *                            - array
 *                enums:
 *                      type: array
 *                      items:
 *                            type: string
 */

/**
 * @swagger
 *  /option:
 *   post:
 *    summary: create new option for category
 *    tags:
 *       - Option
 *    requestBody:
 *          content:
 *                application/x-www-form-urlencoded:
 *                      schema:
 *                            $ref: '#/components/schemas/createOption'
 *                application/json:
 *                      schema:
 *                            $ref: '#/components/schemas/createOption'
 *    responses:
 *          200:
 *                description: created successfully
 */

/**
 * @swagger
 *  /option/{categoryId}:
 *     get:
 *          summary: get all  options of category
 *          tags:
 *                - Option
 *          parameters:
 *              - in: path
 *                name: categoryId
 *                type: string
 *          responses:
 *                200:
 *                      description: get all options done
 *
 *
 */
