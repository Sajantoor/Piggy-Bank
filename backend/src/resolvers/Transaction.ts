import { Resolver, Query, Arg, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { Transaction } from "../entity/Transaction";
import { isAuth } from "../middlewares/authentication";
import { Context } from "../types/Context";

function getUserAuthQuery(req: Context["req"]): object {
    return { where: { createdBy: req.session.userId } }
}

@Resolver()
class TransactionResolver {
    /**
     * Returns a list of transactions
     * @returns {Promise<Transaction[]>} a list of transactions
     */
    @Query(() => [Transaction])
    @UseMiddleware(isAuth)
    async post(@Ctx() { req }: Context): Promise<Transaction[]> {
        return Transaction.find(getUserAuthQuery(req));
    }

    /**
     * Finds a transaction by id and returns it if it exists
     * @param id The id of the transaction to find 
     * @returns A transaction with the given id or undefined if not found
     */
    @Query(() => Transaction)
    @UseMiddleware(isAuth)
    findOne(@Arg("id") id: number, @Ctx() { req }: Context): Promise<Transaction | undefined> {
        return Transaction.findOne(id, getUserAuthQuery(req));
    }

    /**
     * Creates a new transaction and returns it 
     * @param name Creates a new transaction with the given name
     * @returns The newly created transaction
     */
    @Mutation(() => Transaction)
    @UseMiddleware(isAuth)
    createPost(@Arg("name") name: string, @Ctx() { req }: Context): Promise<Transaction> {
        // TODO: 2 SQL queries
        return Transaction.create({ name, createdBy: req.session.userId }).save();
    }

    /**
     * Updates a given transaction identified by id and returns it
     * @param id The id of the transaction to update
     * @param name  The new name of the transaction
     * @returns  The updated transaction
     */
    @Mutation(() => Transaction, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id") id: number,
        @Arg("name", { nullable: true }) name: string,
        @Ctx() { req }: Context
    ): Promise<Transaction | null> {
        // TODO: 2 SQL queries
        const post = await Transaction.findOne(id, getUserAuthQuery(req));

        if (!post)
            return null;

        if (name)
            post.name = name;

        await post.save();
        return post;
    }

    /**
     * Deletes a given transaction identified by id and returns true if it was deleted
     * @param id id of the post we want to delete 
     * @returns true if the post was deleted
     */
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(@Arg("id") id: number, @Ctx() { req }: Context): Promise<boolean> {
        await Transaction.delete(id, getUserAuthQuery(req));
        return true;
    }
}

export default TransactionResolver;