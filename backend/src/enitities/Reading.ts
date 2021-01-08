import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Plant } from "./Plant";

@ObjectType()
@Entity()
export class Reading extends BaseEntity {

	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	plantId!: number;

	@ManyToOne(() => Plant, plant => plant.readings)
	plant: Plant;

	@Field({ nullable: true })
	@Column()
	value: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}