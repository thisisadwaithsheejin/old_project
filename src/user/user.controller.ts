import { Body, Controller,Delete,Get ,Param,Post, Put } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLogService } from './user.log/user.log.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private userLogService: UserLogService, 
        ) {}

    /**
     * Get all users
     * @returns list of all users
     */
    @Get()
    async getAllUser(): Promise<User[]> {
        //retrieve all users
        const users = await this.userService.findAll();
        //Log the action of getting all users
        this.userLogService.log('getAllUser',users)
        return users;
    }

    /**
     * create a new user
     * @param user user The user data to be created
     * @returns {Promise<User>} The created user
     */
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        const createdUser = await this.userService.create(user);
        this.userLogService.log('CreatedUser',createdUser)
        return createdUser;
    }

    /**
     * Get a user by ID
     * @param id id The ID of the user to retrieve
     * @returns The user with the specified ID
     */
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        // Retrieve a user by its ID from the UserService
        return this.userService.findById(id);
    }

    /**
     * Update a user by ID
     * @param id ID of the user to update
     * @param user 
     * @returns the updated user
     */
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userService.updateById(id,user);
        this.userLogService.log('UpdatedUser',updatedUser)
        return updatedUser;
    }

    /**
     * Delete a user by ID
     * @param id The ID of the user to delete
     * @returns {Promise<User>} The deleted user
     */
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.userService.deleteById(id);
        this.userLogService.log('DeleteUser', deletedUser); // Log action
        return deletedUser;
    }
}
