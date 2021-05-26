import { Resolver, Query } from "type-graphql";

@Resolver()
export class hello {
  @Query(() => String)
  hello(): string {
    return "world";
  }
}
