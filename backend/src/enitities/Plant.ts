import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Reading } from "./Reading";
import { User } from "./User";

@ObjectType()
@Entity()
export class Plant extends BaseEntity {

	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field(() => [Reading], { nullable: true })
	@OneToMany(() => Reading, reading => reading.plant)
	readings: Reading[];

	@Field(() => Boolean, { nullable: true })
	@Column({ nullable: true })
	waterAutomatically: boolean;

	@Field()
	@Column()
	creatorId!: number;

	@ManyToOne(() => User, user => user.plants)
	creator: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}