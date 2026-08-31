const verifyEmailTemplate = (verificationUrl) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your Career OS email</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #070A18;
    font-family: Arial, Helvetica, sans-serif;
    color: #E2E8F0;
">

    <!-- Main wrapper -->
    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #070A18; padding: 40px 16px;"
    >
        <tr>
            <td align="center">

                <!-- Email container -->
                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                        max-width: 560px;
                        background-color: #0C1024;
                        border: 1px solid #24294A;
                        border-radius: 16px;
                        overflow: hidden;
                    "
                >

                    <!-- Header -->
                    <tr>
                        <td
                            align="center"
                            style="padding: 32px 32px 24px;"
                        >
                            <div style="
                                font-size: 24px;
                                font-weight: 700;
                                letter-spacing: -0.5px;
                                color: #FFFFFF;
                            ">
                                Career <span style="color: #536DCE;">OS</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 16px 40px 40px;">

                            <h1 style="
                                margin: 0 0 16px;
                                font-size: 28px;
                                line-height: 36px;
                                font-weight: 700;
                                color: #FFFFFF;
                            ">
                                Verify your email
                            </h1>

                            <p style="
                                margin: 0 0 16px;
                                font-size: 15px;
                                line-height: 24px;
                                color: #94A3B8;
                            ">
                                Welcome to Career OS!
                            </p>

                            <p style="
                                margin: 0 0 28px;
                                font-size: 15px;
                                line-height: 24px;
                                color: #94A3B8;
                            ">
                                You're one step away from getting started.
                                Please verify your email address to activate
                                your Career OS account.
                            </p>

                            <!-- CTA -->
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                            >
                                <tr>
                                    <td align="center">

                                        <a
                                            href="${verificationUrl}"
                                            style="
                                                display: inline-block;
                                                background-color: #536DCE;
                                                color: #FFFFFF;
                                                text-decoration: none;
                                                font-size: 15px;
                                                font-weight: 600;
                                                padding: 14px 28px;
                                                border-radius: 10px;
                                            "
                                        >
                                            Verify My Email
                                        </a>

                                    </td>
                                </tr>
                            </table>

                            <!-- Alternative link -->
                            <p style="
                                margin: 28px 0 8px;
                                font-size: 12px;
                                line-height: 20px;
                                color: #64748B;
                            ">
                                If the button above doesn't work, copy and
                                paste the following link into your browser:
                            </p>

                            <p style="
                                margin: 0;
                                font-size: 12px;
                                line-height: 20px;
                                word-break: break-all;
                            ">
                                <a
                                    href="${verificationUrl}"
                                    style="
                                        color: #536DCE;
                                        text-decoration: none;
                                    "
                                >
                                    ${verificationUrl}
                                </a>
                            </p>

                            <!-- Divider -->
                            <div style="
                                height: 1px;
                                background-color: #24294A;
                                margin: 32px 0;
                            "></div>

                            <!-- Security note -->
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                line-height: 20px;
                                color: #64748B;
                            ">
                                <strong style="color: #94A3B8;">
                                    Didn't create a Career OS account?
                                </strong>
                                You can safely ignore this email.
                            </p>

                            <p style="
                                margin: 12px 0 0;
                                font-size: 12px;
                                line-height: 20px;
                                color: #64748B;
                            ">
                                This verification link will expire in
                                <strong style="color: #94A3B8;">
                                    24 hours
                                </strong>.
                            </p>

                        </td>
                    </tr>

                </table>

                <!-- Footer -->
                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="max-width: 560px;"
                >
                    <tr>
                        <td
                            align="center"
                            style="padding: 24px 20px;"
                        >
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                line-height: 18px;
                                color: #475569;
                            ">
                                © ${new Date().getFullYear()} Career OS
                            </p>

                            <p style="
                                margin: 6px 0 0;
                                font-size: 12px;
                                color: #475569;
                            ">
                                Your career. Your roadmap. Your next move.
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`;
};

module.exports = verifyEmailTemplate;