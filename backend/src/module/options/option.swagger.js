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
 *      type: object
 *      required:
 *        - title
 *        - key
 *        - category
 *        - type
 *      properties:
 *        title:
 *          type: string
 *        key:
 *          type: string
 *        category:
 *          type: string
 *        guid:
 *          type: string
 *        type:
 *          type: string
 *          enum:
 *            - number
 *            - string
 *            - boolean
 *            - array
 *        enums:
 *          type: array
 *          items:
 *            type: string
 *        required:
 *          type: boolean
 */

/**
 * @swagger
 * /option:
 *  post:
 *    summary: Create new option for category
 *    tags:
 *      - Option
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/createOption'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createOption'
 *    responses:
 *      200:
 *        description: Created successfully
 */

/**
 * @swagger
 * /option:
 *  get:
 *    summary: Get all options of category
 *    tags:
 *      - Option
 *    responses:
 *      200:
 *        description: Get all options done
 */

/**
 * @swagger
 * /option:
 *  delete:
 *    summary: Delete options
 *    tags:
 *      - Option
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *    responses:
 *      200:
 *        description: Option deleted successfully
 */

/**
 * @swagger
 * /option:
 *  put:
 *    summary: Update options
 *    tags:
 *      - Option
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *              title:
 *                type: string
 *              key:
 *                type: string
 *              category:
 *                type: string
 *              guid:
 *                type: string
 *              type:
 *                type: string
 *                enum:
 *                  - number
 *                  - string
 *                  - boolean
 *                  - array
 *              enums:
 *                type: array
 *                items:
 *                  type: string
 *              required:
 *                type: boolean
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *              title:
 *                type: string
 *              key:
 *                type: string
 *              category:
 *                type: string
 *              guid:
 *                type: string
 *              type:
 *                type: string
 *                enum:
 *                  - number
 *                  - string
 *                  - boolean
 *                  - array
 *              enums:
 *                type: array
 *                items:
 *                  type: string
 *              required:
 *                type: boolean
 *    responses:
 *      200:
 *        description: Option updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 */

/**
 * @swagger
 * /option/get-by-id/{optionId}:
 *  get:
 *    summary: Get option by ID
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: optionId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get option by ID done
 */

/**
 * @swagger
 * /option/category-option-by-id/{categoryId}:
 *  get:
 *    summary: Get options by category ID
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get options by category ID done
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 */

/**
 * @swagger
 * /option/category-option-by-slug/{slug}:
 *  get:
 *    summary: Get category option with search by slug
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: slug
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get category option successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 */
