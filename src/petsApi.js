import { ddb } from "./aws";
import { ScanCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = import.meta.env.VITE_DDB_TABLE;

export async function listPets() {
    const res = await ddb.send(new ScanCommand({ TableName }));
    return res.Items ?? [];
} 

export async function addPet(pet) {
    // pet: { id, name, age, species, status, createdAt }
    await ddb.send(new PutCommand({ TableName, Item: pet }));
}

// Mark a pet as adopted TASK 2
export async function markAdopted(id) {
    await ddb.send(new UpdateCommand({
            TableName,
            Key: { id },
            UpdateExpression: "set #s = :adopted",
            ExpressionAttributeNames: { "#s": "status" },
            ExpressionAttributeValues: { ":adopted": "adopted" }
        })
    );
}

export async function deletePet(id) {
    await ddb.send(new DeleteCommand({ TableName, Key: { id } }));
}

// New pet name - rename a pet
export async function renamePet(id, name) {
    await ddb.send(new UpdateCommand({
            TableName,
            Key: { id },
            UpdateExpression: "set #n = :name",
            ExpressionAttributeNames: { "#n": "name" },
            ExpressionAttributeValues: { ":name": name }
        })
    );
}

        