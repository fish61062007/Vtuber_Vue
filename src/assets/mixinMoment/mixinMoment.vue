<script>
import moment from "moment";
export default {
   methods: {
      moment(value) {
         moment.locale("zh-tw");
         return moment(value);
      },
   },
};
</script>
