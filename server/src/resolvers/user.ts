import { loginInput, registerInput } from "../utils/inputs";
import { authResponse, registerResponse } from "../utils/responses";
import { ValidateEmail } from "../utils/validateEmail";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import argon2 from "argon2";
import { Users } from "../entities/user";
import { jwtgen } from "../utils/jwtgen";
import jwt from "jsonwebtoken";

@Resolver()
export class users {
  @Query(() => [Users])
  getAllUsers(): Promise<Users[]> {
    return Users.find();
  }

  @Mutation(() => registerResponse)
  async register(
    @Arg("registerInfo") registerInfo: registerInput
  ): Promise<registerResponse> {
    if (!ValidateEmail(registerInfo.email)) {
      return {
        msg: "please give a valid email",
      };
    }
    if (ValidateEmail(registerInfo.name)) {
      return {
        msg: "your name looks like it is a email",
      };
    }
    if (registerInfo.name.length <= 3 || registerInfo.password.length <= 3) {
      return {
        msg: "name or email or password must be greater than 3",
      };
    }

    if (/\s/g.test(registerInfo.name)) {
      return {
        msg: "name should not have whitespace in it",
      };
    }

    try {
      registerInfo.password = await argon2.hash(registerInfo.password);
      const user = await Users.create(registerInfo).save();
      const token = jwtgen(user.id);
      return {
        msg: "great",
        token: token,
      };
    } catch (error) {
      return {
        msg: "user already exist",
      };
    }
  }

  @Mutation(() => registerResponse)
  async login(
    @Arg("loginInfo") loginInfo: loginInput
  ): Promise<registerResponse> {
    let user: Users;
    if (ValidateEmail(loginInfo.nameOrEmail)) {
      user = await Users.findOne({ email: loginInfo.nameOrEmail });
    } else {
      user = await Users.findOne({ name: loginInfo.nameOrEmail });
    }

    if (!user) {
      return {
        msg: "user does not exist",
      };
    }

    const isValidate = await argon2.verify(user.password, loginInfo.password);
    if (isValidate) {
      const token = jwtgen(user.id);
      return {
        msg: "great",
        token: token,
      };
    } else {
      return {
        msg: "password is wrong",
      };
    }
  }

  @Query(() => authResponse)
  async auth(@Arg("token") token: string): Promise<authResponse> {
    let verified: any;
    try {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return {
        msg: "token not valid",
      };
    }
    const user = await Users.findOne(verified.user_id);
    return {
      msg: "great",
      user: user,
    };
  }
}
