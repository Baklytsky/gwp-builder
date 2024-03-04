import {useCallback, useState} from "react";
import type {LoaderFunctionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {
  Button, Grid,
  InlineStack, LegacyCard, MediaCard,
  Page,
  PageActions,
  TextField,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import createApp from '@shopify/app-bridge';
import { ResourcePicker }  from '@shopify/app-bridge/actions';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({
    apiKey: process.env.SHOPIFY_API_KEY || "",
    host: new URLSearchParams(request.url).get("host") || ""
  });
};

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { admin } = await authenticate.admin(request);
//   const color = ["Red", "Orange", "Yellow", "Green"][
//     Math.floor(Math.random() * 4)
//   ];
//   const response = await admin.graphql(
//     `#graphql
//       mutation populateProduct($input: ProductInput!) {
//         productCreate(input: $input) {
//           product {
//             id
//             title
//             handle
//             status
//             variants(first: 10) {
//               edges {
//                 node {
//                   id
//                   price
//                   barcode
//                   createdAt
//                 }
//               }
//             }
//           }
//         }
//       }`,
//     {
//       variables: {
//         input: {
//           title: `${color} Snowboard`,
//           variants: [{ price: Math.random() * 100 }],
//         },
//       },
//     },
//   );
//   const responseJson = await response.json();
//
//   return json({
//     product: responseJson.data?.productCreate?.product,
//   });
// };

export default function Index() {
  // const nav = useNavigation();
  // const actionData = useActionData<typeof action>();
  // const submit = useSubmit();
  // const isLoading =
  //   ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  // const productId = actionData?.product?.id.replace(
  //   "gid://shopify/Product/",
  //   "",
  // );

  const { apiKey, host }: { apiKey: string; host: string } = useLoaderData();
  const config = {
    apiKey: apiKey,
    host: host,
    forceRedirect: true
  }

  console.log(config, 'config')

  // useEffect(() => {
  //   if (productId) {
  //     shopify.toast.show("Product created");
  //   }
  // }, [productId]);
  // const generateProduct = () => submit({}, { replace: true, method: "POST" });

  const [threshold, setThreshold] = useState('');
  const handleThresholdChange = useCallback((value: string) => setThreshold(value), []);
  const generateResourcePicker = () => {
    const app = createApp(config);
    const picker = ResourcePicker.create(app, {
      resourceType: ResourcePicker.ResourceType.Product,
      options: {
        selectMultiple: false,
        showHidden: false,
      }
    });
    picker.subscribe(ResourcePicker.Action.SELECT, (payload: any) => {
      console.log(payload.selection);
    });
    picker.dispatch(ResourcePicker.Action.OPEN);
  }
  const saveSelection = () => {
    console.log('Saved')
  }
  const primaryPageAction = {
    content: 'Add GWP',
    onClick: saveSelection
  }

  // @ts-ignore
  return (
    <Page>
      <ui-title-bar title="GWP builder">
      </ui-title-bar>
      <PageActions
        primaryAction={primaryPageAction}
      />
      <MediaCard
        title="Motivate your customers to buy more 😍"
        description={`Lorem ipsum dolor sit amet consectetur, adipiscing elit cubilia libero fames, suscipit fusce montes nulla. Vivamus varius turpis senectus phasellus libero ante nec eu ullamcorper curae neque, aliquam felis lectus nam pulvinar blandit congue commodo aenean porta egestas, auctor potenti ut vel ad eleifend accumsan suscipit fringilla lacinia.`}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
          src="https://walkerinfo.com/wp-content/uploads/2021/12/blog-customerretention.png?width=1650"
        />
      </MediaCard>

      <div style={{margin: '1rem 0'}}>
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <LegacyCard title="Threshold" sectioned>
              <TextField
                value={String(threshold)}
                onChange={handleThresholdChange}
                type="number"
                label={''}
                autoComplete={''}
              />
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <LegacyCard title="Product variant" sectioned>
              <Button variant="secondary" onClick={generateResourcePicker}>
                Choose product variant
              </Button>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </div>

      <InlineStack gap="500">
        <Button variant="primary" onClick={saveSelection}>Add GWP</Button>
      </InlineStack>

      {/*<BlockStack gap="500">*/}
      {/*  <Layout>*/}
      {/*    <Layout.Section>*/}
      {/*      <Card>*/}
      {/*        <BlockStack gap="500">*/}
      {/*          <BlockStack gap="200">*/}
      {/*            <Text as="h2" variant="headingMd">*/}
      {/*              Congrats on creating a new Shopify app 🎉*/}
      {/*            </Text>*/}
      {/*            <Text variant="bodyMd" as="p">*/}
      {/*              This embedded app template uses{" "}*/}
      {/*              <Link*/}
      {/*                url="https://shopify.dev/docs/apps/tools/app-bridge"*/}
      {/*                target="_blank"*/}
      {/*                removeUnderline*/}
      {/*              >*/}
      {/*                App Bridge*/}
      {/*              </Link>{" "}*/}
      {/*              interface examples like an{" "}*/}
      {/*              <Link url="/app/additional" removeUnderline>*/}
      {/*                additional page in the app nav*/}
      {/*              </Link>*/}
      {/*              , as well as an{" "}*/}
      {/*              <Link*/}
      {/*                url="https://shopify.dev/docs/api/admin-graphql"*/}
      {/*                target="_blank"*/}
      {/*                removeUnderline*/}
      {/*              >*/}
      {/*                Admin GraphQL*/}
      {/*              </Link>{" "}*/}
      {/*              mutation demo, to provide a starting point for app*/}
      {/*              development.*/}
      {/*            </Text>*/}
      {/*          </BlockStack>*/}
      {/*          <BlockStack gap="200">*/}
      {/*            <Text as="h3" variant="headingMd">*/}
      {/*              Get started with products*/}
      {/*            </Text>*/}
      {/*            <Text as="p" variant="bodyMd">*/}
      {/*              Generate a product with GraphQL and get the JSON output for*/}
      {/*              that product. Learn more about the{" "}*/}
      {/*              <Link*/}
      {/*                url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"*/}
      {/*                target="_blank"*/}
      {/*                removeUnderline*/}
      {/*              >*/}
      {/*                productCreate*/}
      {/*              </Link>{" "}*/}
      {/*              mutation in our API references.*/}
      {/*            </Text>*/}
      {/*          </BlockStack>*/}
      {/*          <InlineStack gap="300">*/}
      {/*            <Button loading={isLoading} onClick={generateProduct}>*/}
      {/*              Generate a product*/}
      {/*            </Button>*/}
      {/*            {actionData?.product && (*/}
      {/*              <Button*/}
      {/*                url={`shopify:admin/products/${productId}`}*/}
      {/*                target="_blank"*/}
      {/*                variant="plain"*/}
      {/*              >*/}
      {/*                View product*/}
      {/*              </Button>*/}
      {/*            )}*/}
      {/*          </InlineStack>*/}
      {/*          {actionData?.product && (*/}
      {/*            <Box*/}
      {/*              padding="400"*/}
      {/*              background="bg-surface-active"*/}
      {/*              borderWidth="025"*/}
      {/*              borderRadius="200"*/}
      {/*              borderColor="border"*/}
      {/*              overflowX="scroll"*/}
      {/*            >*/}
      {/*              <pre style={{margin: 0}}>*/}
      {/*                <code>{JSON.stringify(actionData.product, null, 2)}</code>*/}
      {/*              </pre>*/}
      {/*            </Box>*/}
      {/*          )}*/}
      {/*        </BlockStack>*/}
      {/*      </Card>*/}
      {/*    </Layout.Section>*/}
      {/*    <Layout.Section variant="oneThird">*/}
      {/*      <BlockStack gap="500">*/}
      {/*        <Card>*/}
      {/*          <BlockStack gap="200">*/}
      {/*            <Text as="h2" variant="headingMd">*/}
      {/*              App template specs*/}
      {/*            </Text>*/}
      {/*            <BlockStack gap="200">*/}
      {/*              <InlineStack align="space-between">*/}
      {/*                <Text as="span" variant="bodyMd">*/}
      {/*                  Framework*/}
      {/*                </Text>*/}
      {/*                <Link*/}
      {/*                  url="https://remix.run"*/}
      {/*                  target="_blank"*/}
      {/*                  removeUnderline*/}
      {/*                >*/}
      {/*                  Remix*/}
      {/*                </Link>*/}
      {/*              </InlineStack>*/}
      {/*              <InlineStack align="space-between">*/}
      {/*                <Text as="span" variant="bodyMd">*/}
      {/*                  Database*/}
      {/*                </Text>*/}
      {/*                <Link*/}
      {/*                  url="https://www.prisma.io/"*/}
      {/*                  target="_blank"*/}
      {/*                  removeUnderline*/}
      {/*                >*/}
      {/*                  Prisma*/}
      {/*                </Link>*/}
      {/*              </InlineStack>*/}
      {/*              <InlineStack align="space-between">*/}
      {/*                <Text as="span" variant="bodyMd">*/}
      {/*                  Interface*/}
      {/*                </Text>*/}
      {/*                <span>*/}
      {/*                  <Link*/}
      {/*                    url="https://polaris.shopify.com"*/}
      {/*                    target="_blank"*/}
      {/*                    removeUnderline*/}
      {/*                  >*/}
      {/*                    Polaris*/}
      {/*                  </Link>*/}
      {/*                  {", "}*/}
      {/*                  <Link*/}
      {/*                    url="https://shopify.dev/docs/apps/tools/app-bridge"*/}
      {/*                    target="_blank"*/}
      {/*                    removeUnderline*/}
      {/*                  >*/}
      {/*                    App Bridge*/}
      {/*                  </Link>*/}
      {/*                </span>*/}
      {/*              </InlineStack>*/}
      {/*              <InlineStack align="space-between">*/}
      {/*                <Text as="span" variant="bodyMd">*/}
      {/*                  API*/}
      {/*                </Text>*/}
      {/*                <Link*/}
      {/*                  url="https://shopify.dev/docs/api/admin-graphql"*/}
      {/*                  target="_blank"*/}
      {/*                  removeUnderline*/}
      {/*                >*/}
      {/*                  GraphQL API*/}
      {/*                </Link>*/}
      {/*              </InlineStack>*/}
      {/*            </BlockStack>*/}
      {/*          </BlockStack>*/}
      {/*        </Card>*/}
      {/*        <Card>*/}
      {/*          <BlockStack gap="200">*/}
      {/*            <Text as="h2" variant="headingMd">*/}
      {/*              Next steps*/}
      {/*            </Text>*/}
      {/*            <List>*/}
      {/*              <List.Item>*/}
      {/*                Build an{" "}*/}
      {/*                <Link*/}
      {/*                  url="https://shopify.dev/docs/apps/getting-started/build-app-example"*/}
      {/*                  target="_blank"*/}
      {/*                  removeUnderline*/}
      {/*                >*/}
      {/*                  {" "}*/}
      {/*                  example app*/}
      {/*                </Link>{" "}*/}
      {/*                to get started*/}
      {/*              </List.Item>*/}
      {/*              <List.Item>*/}
      {/*                Explore Shopify’s API with{" "}*/}
      {/*                <Link*/}
      {/*                  url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"*/}
      {/*                  target="_blank"*/}
      {/*                  removeUnderline*/}
      {/*                >*/}
      {/*                  GraphiQL*/}
      {/*                </Link>*/}
      {/*              </List.Item>*/}
      {/*            </List>*/}
      {/*          </BlockStack>*/}
      {/*        </Card>*/}
      {/*      </BlockStack>*/}
      {/*    </Layout.Section>*/}
      {/*  </Layout>*/}
      {/*</BlockStack>*/}
    </Page>
  );
}
