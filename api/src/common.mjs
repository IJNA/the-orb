import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export const getSecret = async () => {
    const secret_name = process.env.SECRET_NAME;

    const client = new SecretsManagerClient({
        region: "us-east-1",
    });

    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        throw error;
    }

    return response.SecretString;
};
