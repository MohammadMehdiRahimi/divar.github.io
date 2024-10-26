/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth model and routes
 */

/* -------------------------- start schemas section ------------------------- */

/**
 * @swagger
 * components:
 *  schemas:
 *      SendOTP:
 *          type: object
 *          required:
 *              - mobile
 *          properties:
 *              mobile:
 *                  type: string
 *      CheckOTP:
 *          type: object
 *          required:
 *              - mobile
 *              - code
 *          properties:
 *              mobile:
 *                  type: string
 *              code:
 *                  type: string
 *      LogOut:
 *          type: object
 */

/* ------------------------- sart send otp endpoint ------------------------- */
/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: Login with OTP in this endpoint
 *      tags:
 *          - Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *      responses:
 *          200:
 *              description: OTP sent successfully
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *          400:
 *              description: Bad Request - Invalid Input
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          401:
 *              description: Unauthorized - Invalid Credentials
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          403:
 *              description: Forbidden - Access Denied
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          500:
 *              description: Internal Server Error
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 */

/* ------------------------ start check otp end point ----------------------- */
/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *      summary: check OTP in this endpoint
 *      tags:
 *          - Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *      responses:
 *          200:
 *              description: OTP check successfully
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *          400:
 *              description: Bad Request - Invalid Input
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          401:
 *              description: Unauthorized - Invalid Credentials
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          403:
 *              description: Forbidden - Access Denied
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          500:
 *              description: Internal Server Error
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 */

/**
 * @swagger
 * /auth/logout:
 *  post:
 *      summary: log out in this endpoint
 *      tags:
 *          - Auth
 *      responses:
 *          200:
 *              description: logout successfully
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *          400:
 *              description: Bad Request - Invalid Input
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          401:
 *              description: Unauthorized - Invalid Credentials
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          403:
 *              description: Forbidden - Access Denied
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 *          500:
 *              description: Internal Server Error
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            message:
 *                              type: string
 *                            status:
 *                              type: string
 */
