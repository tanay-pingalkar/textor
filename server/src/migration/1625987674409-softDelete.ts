import {MigrationInterface, QueryRunner} from "typeorm";

export class softDelete1625987674409 implements MigrationInterface {
    name = 'softDelete1625987674409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
