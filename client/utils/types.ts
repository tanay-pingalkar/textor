import { Comments, Posts } from "../generated/graphql";

export type Ctree = Omit<Comments, "children"> & { children: Ctree[] };

export type Ptree = Omit<Posts, "comment"> & { comment: Ctree[] };
