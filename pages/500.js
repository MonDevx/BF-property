import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import undraw_fixing_bugs from "../public/img/svg/Illustration/undraw_fixing_bugs_w7gi.svg";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from 'next-seo';
function Custom500() {
    const { t } = useTranslation(["common"]);
    return (
        <>
            <NextSeo
                title={t('common:title-error') + 500}
            />
            <div align="center" style={{ padding: "5%" }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            {"500 - Server-side error occurred"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="subtitle2"
                            style={{ color: "#a1a5b1" }}
                            gutterBottom
                        >
                            คุณอาจลองเส้นทางที่ร่มรื่นหรือมาที่นี่โดยไม่ได้ตั้งใจ
                            ไม่ว่าจะใช้วิธีไหนให้ลองใช้การนำทาง
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Image
                            alt=""
                            src={undraw_fixing_bugs}
                            width={350}
                            height={300}
                        ></Image>
                    </Grid>
                    <Grid item xs={12}>

                        <Link href="/" passHref>
                            <Button
                                variant="contained"
                                color="primary"

                                size="large"
                            >
                                กลับหน้าแรก
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common","header","footer","typeproperty"])),
    },
  });

export default Custom500;
