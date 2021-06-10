import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1623323994939 implements MigrationInterface {
    name = 'initial1623323994939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "reputation" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upvotes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "postId" integer, CONSTRAINT "PK_1c153b493d535b066882358eeae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upvotes_comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "commentId" integer, CONSTRAINT "PK_0b9301876655a3f22196e6b67a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "body" character varying NOT NULL, "totalVotes" double precision NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "downvotes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "postId" integer, CONSTRAINT "PK_01783f2cf5c0424b01c9d0eaca1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "downvotes_comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "commentId" integer, CONSTRAINT "PK_4b94fc373a2d5c9c06b2a8ef41f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "body" character varying NOT NULL, "totalVotes" double precision NOT NULL DEFAULT '0', "userId" integer, "postId" integer, "parentId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "thread" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cabc0f3f27d7b1c70cf64623e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_a02e5093a5d47a64f1fd473d1ef" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89a2762362d968c2939b6fab19" ON "comments_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2164211fd6ab117cfb2ab8ba9" ON "comments_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "upvotes" ADD CONSTRAINT "FK_384eb12a6b63f9ba90a5231b780" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upvotes" ADD CONSTRAINT "FK_415ad66ae8a89a38c8eb8802a85" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upvotes_comments" ADD CONSTRAINT "FK_b79480d4b1cbca16bde8a57b5d5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upvotes_comments" ADD CONSTRAINT "FK_b3012a84da07c7987c0349da1ab" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "downvotes" ADD CONSTRAINT "FK_fa16447384f5ac0ed4b04e9f163" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "downvotes" ADD CONSTRAINT "FK_d0c635c4686800f5756ea2d2354" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "downvotes_comments" ADD CONSTRAINT "FK_833863bf13cea24eda159ba4cfb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "downvotes_comments" ADD CONSTRAINT "FK_0c41ad616f8353976aecbe21579" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_closure" ADD CONSTRAINT "FK_89a2762362d968c2939b6fab193" FOREIGN KEY ("id_ancestor") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_closure" ADD CONSTRAINT "FK_d2164211fd6ab117cfb2ab8ba96" FOREIGN KEY ("id_descendant") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_closure" DROP CONSTRAINT "FK_d2164211fd6ab117cfb2ab8ba96"`);
        await queryRunner.query(`ALTER TABLE "comments_closure" DROP CONSTRAINT "FK_89a2762362d968c2939b6fab193"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "downvotes_comments" DROP CONSTRAINT "FK_0c41ad616f8353976aecbe21579"`);
        await queryRunner.query(`ALTER TABLE "downvotes_comments" DROP CONSTRAINT "FK_833863bf13cea24eda159ba4cfb"`);
        await queryRunner.query(`ALTER TABLE "downvotes" DROP CONSTRAINT "FK_d0c635c4686800f5756ea2d2354"`);
        await queryRunner.query(`ALTER TABLE "downvotes" DROP CONSTRAINT "FK_fa16447384f5ac0ed4b04e9f163"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "upvotes_comments" DROP CONSTRAINT "FK_b3012a84da07c7987c0349da1ab"`);
        await queryRunner.query(`ALTER TABLE "upvotes_comments" DROP CONSTRAINT "FK_b79480d4b1cbca16bde8a57b5d5"`);
        await queryRunner.query(`ALTER TABLE "upvotes" DROP CONSTRAINT "FK_415ad66ae8a89a38c8eb8802a85"`);
        await queryRunner.query(`ALTER TABLE "upvotes" DROP CONSTRAINT "FK_384eb12a6b63f9ba90a5231b780"`);
        await queryRunner.query(`DROP INDEX "IDX_d2164211fd6ab117cfb2ab8ba9"`);
        await queryRunner.query(`DROP INDEX "IDX_89a2762362d968c2939b6fab19"`);
        await queryRunner.query(`DROP TABLE "comments_closure"`);
        await queryRunner.query(`DROP TABLE "thread"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "downvotes_comments"`);
        await queryRunner.query(`DROP TABLE "downvotes"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "upvotes_comments"`);
        await queryRunner.query(`DROP TABLE "upvotes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
