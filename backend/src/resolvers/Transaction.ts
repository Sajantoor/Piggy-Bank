import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Transaction } from "../entity/Transaction";

@Resolver()
class TransactionResolver {
    @Query(() => [Transaction])
    post(): Promise<Transaction[]> {
        return Transaction.find();
    }

    @Query(() => Transaction)
    findOne(@Arg("id") id: number): Promise<Transaction | undefined> {
        return Transaction.findOne(id);
    }

    @Mutation(() => Transaction)
    createPost(@Arg("name") name: string): Promise<Transaction> {
        // 2 SQL queries
        return Transaction.create({ name }).save();
    }

    @Mutation(() => Transaction, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("name", { nullable: true }) name: string
    ): Promise<Transaction | null> {
        // 2 SQL queries
        const post = await Transaction.findOne(id);

        if (!post)
            return null;

        if (name)
            post.name = name;

        await post.save();
        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg("id") id: number): Promise<boolean> {
        await Transaction.delete(id);
        return true;
    }
}

export default TransactionResolver;