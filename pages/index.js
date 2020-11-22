import Head from "next/head";
import styles from "../styles/Home.module.css";
import MapChart from "../components/map";
import useSWR from "swr";
import {
  Grid,
  GridItem,
  Image,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/fetch", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div></div>;
  return (
    <div style={{ padding: "20px", backgroundColor: "#1A202C" }}>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={3} bg="papayawhip" p="4">
          Hi
        </GridItem>
        {data.map((camera) => (
          <GridItem colSpan={1} p="1">
            <Popover>
              <PopoverTrigger>
                <Image
                  width="100%"
                  height="150px"
                  src={
                    camera["image_metadata"].md5 !=
                    "b5fb3395e22ca1564fc5c16ef746e8a9"
                      ? camera.image
                      : "https://cdn.hashnode.com/res/hashnode/image/upload/v1571300841959/Yjr-2Gwib.jpeg"
                  }
                  borderRadius="lg"
                  boxShadow="md"
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Header</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button colorScheme="blue">Button</Button>
                  </PopoverBody>
                  <PopoverFooter>This is the footer</PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
