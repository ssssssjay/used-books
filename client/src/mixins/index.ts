import axios from "axios";

export default {
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async $get(url: string) {
      return (
        await axios.get(url).catch((e) => {
          console.log(e);
        })
      ).data;
    },
    async $post(url: string, data: any) {
      return await axios.post(url, data).catch((e) => {
        console.log(e);
      });
    },
    async $put(url: string, data: any) {
      return await axios.put(url, data).catch((e) => {
        console.log(e);
      });
    },
    async $delete(url: string) {
      return await axios.delete(url).catch((e) => {
        console.log(e);
      });
    },
  },
};
