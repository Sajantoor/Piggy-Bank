import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Transaction } from "../entity/Transaction";

@Resolver()
class TransactionResolver {
    /**
     * Returns a list of transactions
     * @returns {Promise<Transaction[]>} a list of transactions
     */
    @Query(() => [Transaction])
    async post(): Promise<Transaction[]> {
        return Transaction.find();
    }

    /**
     * Finds a transaction by id and returns it if it exists
     * @param id The id of the transaction to find 
     * @returns A transaction with the given id or undefined if not found
     */
    @Query(() => Transaction)
    findOne(@Arg("id") id: number): Promise<Transaction | undefined> {
        return Transaction.findOne(id);
    }

    /**
     * Creates a new transaction and returns it 
     * @param name Creates a new transaction with the given name
     * @returns The newly created transaction
     */
    @Mutation(() => Transaction)
    createPost(@Arg("name") name: string): Promise<Transaction> {
        // TODO: 2 SQL queries
        return Transaction.create({ name }).save();
    }

    /**
     * Updates a given transaction identified by id and returns it
     * @param id The id of the transaction to update
     * @param name  The new name of the transaction
     * @returns  The updated transaction
     */
    @Mutation(() => Transaction, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("name", { nullable: true }) name: string
    ): Promise<Transaction | null> {
        // TODO: 2 SQL queries
        const post = await Transaction.findOne(id);

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
    async deletePost(@Arg("id") id: number): Promise<boolean> {
        await Transaction.delete(id);
        return true;
    }
}

export default TransactionResolver;