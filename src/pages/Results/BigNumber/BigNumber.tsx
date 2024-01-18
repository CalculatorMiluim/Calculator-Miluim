import React from 'react'
import {Box, SxProps, Theme, Typography} from "@mui/material";
import {COLORS} from "@/consts/colors.ts";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

interface IBigNumber {
    amount: number
    variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
    sx?: SxProps<Theme>
    containerSx?: SxProps<Theme>
}

const BigNumber: React.FC<IBigNumber> = ({amount, variant = "h2", sx, containerSx}) => {
    return (
        <Box
            sx={{
                display: "flex",
                borderRadius: 5,
                bgcolor: COLORS.WHITE,
                alignItems: "center",
                justifyContent: "center",
                py: 4,
                px: 6,
                ...containerSx
            }}>
            <Typography color="primary" variant={variant} sx={sx}>
                {amount.toLocaleString()} ₪
            </Typography>
        </Box>
    )
}

export default BigNumber
