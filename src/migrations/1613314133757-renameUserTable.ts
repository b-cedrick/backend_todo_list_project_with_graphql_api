import {MigrationInterface, QueryRunner} from "typeorm";

export class renameUserTable1613314133757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` RENAME TO `users`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` RENAME TO `user`");
    }

}
