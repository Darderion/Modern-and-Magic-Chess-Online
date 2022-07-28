/**
 * @swagger
 * 
 * /auth/register:
 *   post:
 *     description: Create new user account with your nick and password that will be saved in the db
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nick:
 *                 type: string
 *                 description: Nickname for user account
 *               password:
 *                 type: string
 *                 description: Password from user account
 *     responses:
 *       400:
 *         description: Request body is either empty or doesn't contain password or nick fields
 *       409:
 *         description: User already exists
 *       500:
 *         description: Problems with adding new user into db
 *       200:
 *         description: User created successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: User id in db
 * 
 * 
 * /auth/login:
 *   post:
 *     description: Enter your nick and password to enter your game account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nick:
 *                 type: string
 *                 description: Nickname for user account
 *               password:
 *                 type: string
 *                 description: Password from user account
 *     responses:
 *       400:
 *         description: Request body is either empty or doesn't contain password or nick fields
 *       404:
 *         description: User not found
 *       403:
 *         description: Wrong credentials
 *       200:
 *         description: User logged in successfully
 * 
 * 
 * /auth/refresh:
 *   post:
 *     description: Renew your refresh token
 *     responses:
 *       403:
 *         description: Refresh token is not provided
 *       400:
 *         description: Invalid refresh token. Please logout
 *       401:
 *         description: Refresh token has been expired. Please logout
 *       200:
 *         description: User token refreshed successfully
 * 
 * 
 * /auth/logout:
 *   get:
 *     description: Logout from your game account
 *     responses:
 *       400:
 *         description: Refresh token is not provided
 *       200:
 *         description: User logged out successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   content: 'Successfully logout'

 *  */
