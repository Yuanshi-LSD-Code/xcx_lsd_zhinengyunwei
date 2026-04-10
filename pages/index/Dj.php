<?php
/*基础接口*/

namespace app\appapi\controller;

use app\common\controller\ApiBase;
use app\common\logic\BidLogic;
use think\facade\Request;
use think\facade\Db;
use app\common\model\Dj as djModel;
use app\common\model\DjDoc;
use app\common\model\DjNotice;
use app\common\model\DjFactory;
use app\common\model\DjLogAvgbg;
use app\common\model\DjRepair;
use app\common\model\DjFactoryReport;
use app\common\model\DjReport;
use app\common\model\Cate;
use app\common\model\DjLogBg;
/**
 * 
 */
class Dj extends ApiBase
{
    protected $noAuth = [];

  
    
/**
     * 返回工厂电机列表
     */
    public function djFactory()
    {
        $data = [];

        $dj = function ($query) {
            $query->where('is_del', 1);
        };

        $factory_list =  DjFactory::alias('a')
            ->join('dj_factory_admin b', 'b.dj_factory_id = a.id')
            // ->with(['dj' => $dj])
            ->where('b.admin_id', $this->_adminId())
            ->where('a.is_del', 1)
            ->field('a.*')
            ->order('a.sort desc,a.id desc')
            ->select()->toArray();

      
        $data['factory_list'] = $factory_list;

        apiSuccess($data);
    }

    /**
     * 首页返回工厂电机列表
     */
    public function djFactoryDjList()
    {

        $param = $this->request->param();

        $factory_id = $param['factory_id'];

        $where[] = ['b.admin_id', '=', $this->_adminId()];
        $where[] = ['a.is_del', '=', 1];

        if ($factory_id > 0) {
            $where[] = ['a.id', '=', $factory_id];
        }

        $dj = function ($query) {
            $query->where('is_del',1)->with(['avgbg']);
        };
        $data = [];
        $factory_dj_list =  DjFactory::alias('a')
            ->join('dj_factory_admin b', 'b.dj_factory_id = a.id')
            ->with(['dj' => $dj])
            ->where($where)
            ->order('a.sort desc,id desc')
            ->field('a.*')
            ->select()->toArray();

        $factory_dj_has = false;

        foreach ($factory_dj_list as $k => $v) {
            if (isset($v['dj']) && !empty($v['dj'])) {
                $factory_dj_has = true;
                break;
            }
        }


        $data['factory_dj_list'] = $factory_dj_list;
        $data['factory_dj_has'] = $factory_dj_has;

        apiSuccess($data);
    }
    
    
    /**
     * 首页返回组件状态
     */
    public function djFactoryBarStatus()
    {

        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        // $where[] = ['d.admin_id', '=', 1];
        $where[] = ['d.admin_id', '=', $this->_adminId()];

        if ($factory_id > 0) {
            $where[] = ['c.id', '=', $factory_id];
        }
        $where[]=['b.is_del','=',1];
        $where[]=['c.is_del','=',1];
        //今天
        $where[] = ['a.day_time', '=', strtotime(date('Y-m-d'))];

        $data = [];
        $sql= Db::name('dj_log_bg')->order('add_time desc')->group('device_id')->field("max(id) as id")->buildSql();
        $factory_dj_list =  DjLogBg::alias('a')
        // $factory_dj_list =  DjLogAvgbg::alias('a')
            ->join($sql .'e','e.id=a.id')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*')
            ->select()->toArray();

        $jkd['bar1_count'][1] = 0;
        $jkd['bar1_count'][2] = 0;
        $jkd['bar1_count'][3] = 0;
        $jkd['bar1_count'][4] = 0;

        $jkd['bar2_count'][1] = 0;
        $jkd['bar2_count'][2] = 0;
        $jkd['bar2_count'][3] = 0;
        $jkd['bar2_count'][4] = 0;

        $jkd['bar3_count'][1] = 0;
        $jkd['bar3_count'][2] = 0;
        $jkd['bar3_count'][3] = 0;
        $jkd['bar3_count'][4] = 0;

        $jkd['bar4_count'][1] = 0;
        $jkd['bar4_count'][2] = 0;
        $jkd['bar4_count'][3] = 0;
        $jkd['bar4_count'][4] = 0;

        $jkd['bar5_count'][1] = 0;
        $jkd['bar5_count'][2] = 0;
        $jkd['bar5_count'][3] = 0;
        $jkd['bar5_count'][4] = 0;

        $jkd['bar6_count'][1] = 0;
        $jkd['bar6_count'][2] = 0;
        $jkd['bar6_count'][3] = 0;
        $jkd['bar6_count'][4] = 0;
        foreach ($factory_dj_list as $k => $v) {
            if (isset($jkd['bar1_count'][$v['bar1_jkd']])) {
                $jkd['bar1_count'][$v['bar1_jkd']] += 1;
            }
            if (isset($jkd['bar2_count'][$v['bar2_jkd']])) {
                $jkd['bar2_count'][$v['bar2_jkd']] += 1;
            }
            if (isset($jkd['bar3_count'][$v['bar3_jkd']])) {
                $jkd['bar3_count'][$v['bar3_jkd']] += 1;
            }
            if (isset($jkd['bar4_count'][$v['bar4_jkd']])) {
                $jkd['bar4_count'][$v['bar4_jkd']] += 1;
            }
            if (isset($jkd['bar5_count'][$v['bar5_jkd']])) {
                $jkd['bar5_count'][$v['bar5_jkd']] += 1;;
            }
            if (isset($jkd['bar6_count'][$v['bar6_jkd']])) {
                $jkd['bar6_count'][$v['bar6_jkd']] += 1;
            }
        }

        $series[0] = [
            'name' => '高风险',
            'type' => 'bar',
            'stack' => 'Ad',
            'barWidth' => 25,
            'emphasis' => ['focus' => 'series'],
            'data' => [],
            'itemStyle'=> ['color'=> '#DF0303'],
        ];
        $series[1] = [
            'name' => '关注',
            'type' => 'bar',
            'stack' => 'Ad',
            'barWidth' => 25,
            'emphasis' => ['focus' => 'series'],
            'data' => [],
            'itemStyle'=> ['color'=> '#FCDF44']
        ];
        $series[2] = [
            'name' => '正常',
            'type' => 'bar',
            'stack' => 'Ad',
            'barWidth' => 25,
            'emphasis' => ['focus' => 'series'],
            'data' => [],
            'itemStyle'=> ['color'=> '#00CC00']
        ];
        $series[3] = [
            'name' => '良好',
            'type' => 'bar',
            'stack' => 'Ad',
            'barWidth' => 25,
            'emphasis' => ['focus' => 'series'],
            'data' => [],
            'itemStyle'=> ['color'=> '#0D08E8']
        ];


        for ($i = 0; $i <= 3; $i++) {
            $series[$i]['data'][] = $jkd['bar6_count'][4 - $i];
            $series[$i]['data'][] = $jkd['bar5_count'][4 - $i];
            $series[$i]['data'][] = $jkd['bar4_count'][4 - $i];
            $series[$i]['data'][] = $jkd['bar1_count'][4 - $i];
            $series[$i]['data'][] = $jkd['bar3_count'][4 - $i];
            $series[$i]['data'][] = $jkd['bar2_count'][4 - $i];
        }

        $legendData = [
            [
                'name' => '高风险',
                // 'textStyle'=> ['color'=> '#DF0303'],
            ],
            [
                'name' => '关注',
                // 'textStyle'=> ['color'=> '#FCDF44']
            ],
            [
                'name' => '正常',
                // 'textStyle'=> ['color'=> '#00CC00']
            ],
            [
                'name' => '良好',
                // 'textStyle'=> ['color'=> '#0D08E8']
            ]
        ];

        $data['legendData'] = $legendData;
        $data['series'] = array_reverse($series);
        $data['color'] = ['#DF0303', '#FCDF44', '#00CC00', '#0D08E8'];

        apiSuccess($data);
    }
    
    //--首页检修信息统计
    public function djFactoryRepairList()
    {

        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        $start_time = strtotime(date('Y-m-d', strtotime($param['start_time'])));
        $end_time = strtotime(date('Y-m-d', strtotime($param['end_time'])));


        // $where[] = ['d.admin_id', '=', 1];
        $where[] = ['b.admin_id', '=', $this->_adminId()];

        if ($factory_id > 0) {
            $where[] = ['a.id', '=', $factory_id];
        }
        
        // $where[] = ['c.is_del','=',1];
        // $where[] = ['c.status','=',1];
        // $where[] = ['c.repair_time','>',time()];

        $data = [];
        $factory_list =  DjFactory::alias('a')
            ->join('dj_factory_admin b', 'b.dj_factory_id = a.id')
            ->join('dj_repair c', "c.dj_factory_id = a.id and c.repair_time>=$start_time and c.repair_time<=$end_time and c.status=1", 'left')
            ->where($where)
            ->where('a.is_del', 1)
            ->order('a.sort desc,id desc')
            ->group('a.id,c.bar_id')
            ->field('a.id,a.title as name,c.bar_id,count(c.id) as repair_num')
            ->select()->toArray();

        $legendData = [];
        $series = [];
        $repairNum[] = [];
        $factory_temp = [];
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        foreach ($factory_list as $k => $v) {


            if (!in_array($v['id'], $factory_temp)) {
                $series_temp['barWidth'] = 25;
                $series_temp['data'] = [];
                $series_temp['emphasis'] = ['focus' => 'series'];
                $series_temp['name'] = $v['name'];
                $series_temp['stack'] = 'ad';
                $series_temp['type'] = 'bar';
                $series_temp['factory_id'] = $v['id'];
                array_push($series, $series_temp);
                array_push($factory_temp, $v['id']);
                array_push($legendData, $v['name']);
            }


            if ($v['bar_id'] > 0) {
                $repairNum[$v['id'] . '_' . $v['bar_id']] += $v['repair_num'];
            }
        }
        foreach ($series as $k => $v) {

            $series[$k]['data'][] = isset($repairNum[$v['factory_id'] . '_912']) ? $repairNum[$v['factory_id'] . '_912'] : 0;
            $series[$k]['data'][] = isset($repairNum[$v['factory_id'] . '_911']) ? $repairNum[$v['factory_id'] . '_911'] : 0;
            $series[$k]['data'][] = isset($repairNum[$v['factory_id'] . '_910']) ? $repairNum[$v['factory_id'] . '_910'] : 0;
            $series[$k]['data'][] = isset($repairNum[$v['factory_id'] . '_909']) ? $repairNum[$v['factory_id'] . '_909'] : 0;
            $series[$k]['data'][] = isset($repairNum[$v['factory_id'] . '_908']) ? $repairNum[$v['factory_id'] . '_908'] : 0;
            $series[$k]['data'][] = isset($repairNum[$v['factory_id'] . '_907']) ? $repairNum[$v['factory_id'] . '_907'] : 0;
        }

        $data['legendData'] = $legendData;
        $data['series'] = $series;

        apiSuccess($data);
    }
    
     /**
     * 首页返回工厂电机列表
     */
    public function djList()
    {

        $param = $this->request->param();

        $factory_id = $param['factory_id'];

        $where[] = ['b.admin_id', '=', $this->_adminId()];
        $where[] = ['a.is_del', '=', 1];

        if ($factory_id > 0) {
            $where[] = ['a.dj_factory_id', '=', $factory_id];
        }

        $dj = function ($query) {
            $query->with(['avgbg']);
        };
        $data = [];
        $factory_dj_list =  djModel::alias('a')
            ->join('dj_factory_admin b', 'b.dj_factory_id = a.dj_factory_id')
            ->with(['avgbg'])
            ->where($where)
            ->field('a.*')
            ->select()->toArray();

        $data['factory_dj_list'] = $factory_dj_list;

        apiSuccess($data);
    }
    
    public function dJRepairInfo()
    {
        $param = $this->request->param();

        // $device_id = $param['device_id'] ?? 0;
        // if ($device_id <= 0) apiError();

        // $info =  Dj::where('device_id', $device_id)->where('is_del', 1)->order('id desc')->find();
        $total_where = [];
        $factory_id = $param['factory_id'];

        if ($factory_id > 0) {
            $total_where[] = ['dj_factory_id', '=', $factory_id];
        }
        
       
        $where = [];
        $where2 = [];

        // $total_where[] = ['dj_id', '=', $info['id']];

        $where[] = ['status', '=', 1];
        $where2[] = ['status', '>', 1];
        
        $where[] = ['is_del', '=', 1];
        $where2[] = ['is_del', '=', 1];

        $repair_time[] = $param['start_time'];
        $repair_time[] = $param['end_time'];
        $repair_true_time[] = $param['start_time'];
        $repair_true_time[] = $param['end_time'];

        //计划
        $start_time = strtotime(date('Y-m-d', strtotime($repair_time[0])));
        $end_time = strtotime(date('Y-m-d', strtotime($repair_time[1])));

        if ($start_time && $end_time) {
            $where[] = ['repair_time', '>=', $start_time];
            $where[] = ['repair_time', '<=', $end_time];
        }

        //实际
        $start_time2 = strtotime(date('Y-m-d', strtotime($repair_true_time[0])));
        $end_time2 = strtotime(date('Y-m-d', strtotime($repair_true_time[1])));
        if ($start_time2 && $end_time2) {
            $where2[] = ['repair_true_time', '>=', $start_time2];
            $where2[] = ['repair_true_time', '<=', $end_time2];
        }


        $list_temp = DjRepair::where($where)->where($total_where)->group('bar_id')->field('bar_id,count(id) as number')->select();
        $list2_temp = DjRepair::where($where2)->where($total_where)->group('bar_id')->field('bar_id,count(id) as number')->select();

        $list = [];
        $list2 = [];
        foreach ($list_temp as $k => $v) {
            $list[$v['bar_id']] = $v['number'];
        }

        foreach ($list2_temp as $k => $v) {
            $list2[$v['bar_id']] = $v['number'];
        }

        $repair = [];
        $repair_true = [];
        $repair[] = isset($list[912]) ? $list[912] : 0;
        $repair[] = isset($list[911]) ? $list[911] : 0;
        $repair[] = isset($list[910]) ? $list[910] : 0;
        $repair[] = isset($list[909]) ? $list[909] : 0;
        $repair[] = isset($list[908]) ? $list[908] : 0;
        $repair[] = isset($list[907]) ? $list[907] : 0;

        $repair_true[] = isset($list2[912]) ? $list2[912] : 0;
        $repair_true[] = isset($list2[911]) ? $list2[911] : 0;
        $repair_true[] = isset($list2[910]) ? $list2[910] : 0;
        $repair_true[] = isset($list2[909]) ? $list2[909] : 0;
        $repair_true[] = isset($list2[908]) ? $list2[908] : 0;
        $repair_true[] = isset($list2[907]) ? $list2[907] : 0;


        $data['repair'] = $repair;
        $data['repairTrue'] = $repair_true;
        $data['repairDj'] = $info;
        $data['repairDj']['factory_title'] = Db::name('dj_factory')->where('id', $info['dj_factory_id'])->value('title');


        apiSuccess($data);
    }
    
    /**
     * 首页检修计划 未开始
     */
    public function djRepairListNo()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        $where[] = ['b.admin_id', '=', $this->_adminId()];

        if ($factory_id > 0) {
            $where[] = ['a.dj_factory_id', '=', $factory_id];
        }


        $where[] = ['a.status', '=', 1];

        $field = 'a.*,c.title as dj_title';

        $order = 'a.add_time desc,a.id desc';
        //组合查询数组
        $filter = [
            "where" => $where,
            "field" => $field,
            'order' =>  $order,
            'append'=>['status_title'],
            'limit' =>  isset($param['limit']) ? $param['limit'] : 6,
            'page' =>  isset($param['page']) ? $param['page'] : 1,
            'join' => [
                ['dj_factory_admin b', 'b.dj_factory_id = a.dj_factory_id'],
                ['dj c', 'c.id = a.dj_id'],
            ]
        ];
        $model = new DjRepair();
        $data = $model->db_join($filter);

        foreach ($data['list'] as $k => $v) {
            $data['list'][$k]['label_title'] = $v['dj_title'] . '电机在' . $v['repair_date'] . '进行' . $v['bar_title'] . '检修';
        }

        apiSuccess($data);
    }
    
     /**
     * 首页工厂报告
     */
    public function djFactoryReportListNo()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        $where[] = ['b.admin_id', '=', $this->_adminId()];

        if ($factory_id > 0) {
            $where[] = ['a.dj_factory_id', '=', $factory_id];
        }
        // if(isset($param['uname']) && !empty($param['uname'])){
        //     $where[] = ['d.account', 'like', '%'.$param['uname'].'%'];
        // }


        $field = 'a.*,c.title as factory_title';

        $order = 'a.add_time desc,a.id desc';
        //组合查询数组
        $filter = [
            "where" => $where,
            "field" => $field,
            'order' =>  $order,
            'limit' =>  isset($param['limit']) ? $param['limit'] : 6,
            'page' =>  isset($param['page']) ? $param['page'] : 1,
            'join' => [
                ['dj_factory_admin b', 'b.dj_factory_id = a.dj_factory_id'],
                ['dj_factory c', 'c.id = a.dj_factory_id'],
                // ['admin d', 'd.id = a.admin_id'],
            ]
        ];
        $model = new DjFactoryReport();
        $data = $model->db_join($filter);

        foreach ($data['list'] as $k => $v) {
            $data['list'][$k]['label_title'] = $v['factory_title'] . '工厂_' . date('Y年m月',$v['start_month']) . '-' . date('Y年m月',$v['end_month']) . '报告';
            $data['list'][$k]['pdf_url'] = request()->domain().$v['pdf_url'];
        }

        apiSuccess($data);
    }
    
    
        //点击组件
    public function djDayBarList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;
        
        $now = time(); // 获取当前时间戳
        $last_month = strtotime('-1 month', $now); // 往前推一个月
        $date = date('Y-m-d', $last_month); // 将结果转换为指定格式的日期字符串，比如"2022-09-08"
        $start_time = strtotime($date);
        $end_time = strtotime(date('Y-m-d'));

        $days = ($end_time - $start_time) / 86400;
        if ($days > 365) apiError('日期间隔不能超过一年');


        $where[] = ['a.day_time', '>=', $start_time];
        $where[] = ['a.day_time', '<=', $end_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];
        if ($factory_id > 0) {
            $where[] = ['c.id', '=', $factory_id];
        }
         $where[] = ['b.is_del', '=', 1];
        $bar_jkd = $param['bar_type'] ? $param['bar_type'] . '_jkd' : 'bar1_jkd';

        $day_month = [];
        $months = [];
        $n = 0;
        $months_date = 'd';
        if ($days > 31) {
            $months_date = 'm-d';
        }
        while (strtotime('-' . $n . ' day', $end_time) >= $start_time) {

            array_unshift($day_month, date('Y-m-d', strtotime('-' . $n . ' day', $end_time)));
            array_unshift($months, date($months_date, strtotime('-' . $n . ' day', $end_time)));
            $n++;
        }
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*,count(a.id) as number')
            ->order('a.day_time asc')
            ->group('a.day_time,' . "a.$bar_jkd")
            // ->group('a.day_time,a.device_id,' . "a.$bar_jkd")
            ->select()->toArray();
        // apiSuccess($avgbg_list);
        $change_avgbg_list = [];
        foreach ($avgbg_list as $v) {
            $change_avgbg_list[$v['day_time'] . '_' . $v[$bar_jkd]] += $v['number'];
        }

        $months_value[0] = [
            'name' => '良好',
            'data' => [],
            'type' => 'line',
        ];
        $months_value[1] = [
            'name' => '正常',
            'data' => [],
            'type' => 'line',
        ];
        $months_value[2] = [
            'name' => '关注',
            'data' => [],
            'type' => 'line',
        ];
        $months_value[3] = [
            'name' => '高风险',
            'data' => [],
            'type' => 'line',
        ];

        foreach ($day_month as $k => $v) {
            $v = strtotime($v);
            $months_value[0]['data'][] = isset($change_avgbg_list[$v . '_1']) ? $change_avgbg_list[$v . '_1'] : 0;
            $months_value[1]['data'][] = isset($change_avgbg_list[$v . '_2']) ? $change_avgbg_list[$v . '_2'] : 0;
            $months_value[2]['data'][] = isset($change_avgbg_list[$v . '_3']) ? $change_avgbg_list[$v . '_3'] : 0;
            $months_value[3]['data'][] = isset($change_avgbg_list[$v . '_4']) ? $change_avgbg_list[$v . '_4'] : 0;
        }

        $data = [];
        //横坐标天数
        $data['dayMonth'] = $day_month;
        $data['xAxisData'] = $months;
        $data['series'] = $months_value;
        apiSuccess($data);
    }
    
    
    //全部电机定子状态
    public function djBarDayDjList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        if (empty($param['time'])) {
            $param['time'] = date('Y-m-d');
        }

        $day_time = strtotime(date('Y-m-d', strtotime($param['time'])));

        if ($day_time > time()) apiError('日期间隔不能超过今天');

        $bar = $param['bar_type'] ?? 'bar1';

        $yesterday_time = $day_time - 86400;
        // $where[] = ['a.day_time', '=', $day_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];
        $where[] = ['b.is_del', '=', 1];
        if ($factory_id > 0) {
            $where[] = ['c.id', '=', $factory_id];
        }
        $where[] = ['b.is_del', '=', 1];

        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->where('a.day_time', $day_time)
            ->field('a.*,b.title as dj_title')
            ->order('c.sort asc,b.sort asc,b.id desc')
            ->select()->toArray();
        $avgbg_yesterday_list_temp =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->where('a.day_time', $yesterday_time)
            ->field('a.*,b.title as dj_title')
            ->order('c.sort asc,b.sort asc,b.id asc')
            ->select()->toArray();

        foreach ($avgbg_yesterday_list_temp as $k => $v) {
            $avgbg_yesterday_list[$v['device_id']] = $v;
        }

        $series[0]['name'] = date('Y-m-d', $yesterday_time);
        $series[0]['type'] = 'bar';
        $series[0]['barGap'] = '0%';
        // $series[0]['barWidth'] = 15;
        $series[0]['data'] = [];
        // barGap: '10%',          // 相邻柱状图间隔
        // barCategoryGap: '20%',  // 不同系列间隔
        //今天
        $series[1]['name'] = date('Y-m-d', $day_time);
        $series[1]['type'] = 'bar';
        // $series[1]['barWidth'] = 15;
        $series[1]['data'] = [];
        // apiSuccess($avgbg_list);
        $yAxisData = [];
        $yAxisLabel = [];
        foreach ($avgbg_list as $k => $v) {
            $series[1]['data'][] = $this->barChange($v[$bar]);
            if (isset($avgbg_yesterday_list[$v['device_id']])) {
                $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list[$v['device_id']][$bar]);
            } else {
                $series[0]['data'][] = 0;
            }
            $yAxisData[] = $v['dj_title'];
            $yAxisLabel[] = $v['device_id'];
        }

        $data = [];
        $data['series'] = $series;
        $data['yAxisData'] = array_reverse($yAxisData);
        $data['yAxisLabel'] = $yAxisLabel;
        apiSuccess($data);
    }
    
    public function barChange2($bar)
    {
        $bar_change = 0;
        if ($bar <= 0) { //0-20
            $ba = ($bar + 3) / (3);
            $temp =  $ba * 20 + 0;
        } elseif ($bar > 0 && $bar <= 3) { //20-40
            $ba = $bar / 3;
            $temp =    $ba * 20 + 20;
        } elseif ($bar > 3 && $bar <= 8) { //40-60
            $ba = ($bar - 3) / (8 - 3);
            $temp =    $ba  * 20 + 40;
        } elseif ($bar > 8 && $bar <= 40) {  //60-80
            $ba = ($bar - 8) / (40 - 8);
            $temp =  $ba * 20 + 60;
        } else {
            $temp = 0;
        }
        $bar_change = $temp;

        return round($bar_change, 2);
    }
    
     public function barChange($bar)
    {
        $bar_change = 0;
        if ($bar <= 0) { //0-20
            $ba = ($bar + 3) / (3);
            $temp =  $ba * 20 + 0;
        } elseif ($bar > 0 && $bar <= 3) { //20-40
            $ba = $bar / 3;
            $temp =    $ba * 20 + 20;
        } elseif ($bar > 3 && $bar <= 8) { //40-60
            $ba = ($bar - 3) / (8 - 3);
            $temp =    $ba  * 20 + 40;
        } elseif ($bar > 8 && $bar <= 40) {  //60-80
            $ba = ($bar - 8) / (40 - 8);
            $temp =  $ba * 20 + 60;
        } else {
            $temp = 0;
        }
        $bar_change = $temp;

        return round($bar_change, 2);
    }
    
     //电机定子状态
    public function djBarDayDayList()
    {
        $param = $this->request->param();
        
        
        $device_id = $param['device_id'] ?? 0;
        $start_time = strtotime(date('Y-m-d', strtotime($param['start_time'])));
        $end_time = strtotime(date('Y-m-d', strtotime($param['end_time'])));

        $days = ($end_time - $start_time) / 86400;
        if ($days > 365) apiError('日期间隔不能超过一年');
        // if ($device_id <= 0) apiError();
        // if($device_id <=0){
        //     $data['dayMonth'] = [];
        //     $data['series'] = [];
        //     $data['xAxisData'] = [];
        //     apiSuccess($data);
        // }

        $where[] = ['a.day_time', '>=', $start_time];
        $where[] = ['a.day_time', '<=', $end_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];
        

        $where[] = ['a.device_id', '=', $device_id];
        $where[] = ['b.is_del', '=', 1];

        $bar = $param['bar_type'] ?? 'bar1';

        $day_month = [];
        $months = [];
        $n = 0;
        $months_date = 'd';
        if ($days > 61) {
            $months_date = 'm-d';
        }
        while (strtotime('-' . $n . ' day', $end_time) >= $start_time) {
            array_unshift($day_month, strtotime(date('Y-m-d', strtotime('-' . $n . ' day', $end_time))));
            array_unshift($months, date($months_date, strtotime('-' . $n . ' day', $end_time)));
            $n++;
        }

        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*')
            ->order('a.day_time asc')
            ->select()->toArray();;

        $series_data = [];
        $new_avgbg_list = [];
        foreach ($avgbg_list as $v) {
            $new_avgbg_list[$v['day_time']] = $v;
        }
        // apiSuccess($new_avgbg_list);
        foreach ($day_month as $k => $v) {
            if (isset($new_avgbg_list[$v])) {
                $series_data[$k] = $this->barChange2($new_avgbg_list[$v][$bar]);
            } else {
                $series_data[$k] = 0;
            }
        }

        foreach ($day_month as $k => $v) {
            $day_month[$k] = date('Y-m-d', $v);
        }

        $series[0]['data'] = $series_data;
        $series[0]['type'] = 'line';

        $data['dayMonth'] = $day_month;
        $data['series'] = $series;
        $data['xAxisData'] = $months;
        apiSuccess($data);
    }

 //所有电机每日健康度
    public function factoryDjAvgbgList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;
        // $start_time = strtotime(date('Y-m-d', strtotime($param['time'][0])));
        // $end_time = strtotime(date('Y-m-d', strtotime($param['time'][1])));
        $now = time(); // 获取当前时间戳
        $last_month = strtotime('-1 month', $now); // 往前推一个月
        $date = date('Y-m-d', $last_month); // 将结果转换为指定格式的日期字符串，比如"2022-09-08"
        $start_time = strtotime($date);
        $end_time = strtotime(date('Y-m-d'));

        $days = ($end_time - $start_time) / 86400;
        if ($days > 365) apiError('日期间隔不能超过一年');


        $where[] = ['a.day_time', '>=', $start_time];
        $where[] = ['a.day_time', '<=', $end_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];
        $where[] = ['b.is_del','=',1];
        if ($factory_id > 0) {
            $where[] = ['c.id', '=', $factory_id];
        }

        $day_month = [];
        $months = [];
        $n = 0;
        $months_date = 'd';
        if ($days > 31) {
            $months_date = 'm-d';
        }
        while (strtotime('-' . $n . ' day', $end_time) >= $start_time) {

            array_unshift($day_month, date('Y-m-d', strtotime('-' . $n . ' day', $end_time)));
            array_unshift($months, date($months_date, strtotime('-' . $n . ' day', $end_time)));
            $n++;
        }
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*,count(a.id) as number')
            ->order('a.day_time asc')
            ->group('a.day_time,a.jkd_jkd')
            ->select()->toArray();
        // apiSuccess($avgbg_list);
        $change_avgbg_list = [];
        foreach ($avgbg_list as $v) {
            $change_avgbg_list[$v['day_time'] . '_' . $v['jkd_jkd']] += $v['number'];
        }

        $months_value[0] = [
            'name' => '良好',
            'data' => [],
            'type' => 'line',
        ];
        $months_value[1] = [
            'name' => '正常',
            'data' => [],
            'type' => 'line',
        ];
        $months_value[2] = [
            'name' => '关注',
            'data' => [],
            'type' => 'line',
        ];
        $months_value[3] = [
            'name' => '高风险',
            'data' => [],
            'type' => 'line',
        ];

        foreach ($day_month as $k => $v) {
            $v = strtotime($v);
            $months_value[0]['data'][] = isset($change_avgbg_list[$v . '_1']) ? $change_avgbg_list[$v . '_1'] : 0;
            $months_value[1]['data'][] = isset($change_avgbg_list[$v . '_2']) ? $change_avgbg_list[$v . '_2'] : 0;
            $months_value[2]['data'][] = isset($change_avgbg_list[$v . '_3']) ? $change_avgbg_list[$v . '_3'] : 0;
            $months_value[3]['data'][] = isset($change_avgbg_list[$v . '_4']) ? $change_avgbg_list[$v . '_4'] : 0;
        }

        $data = [];
        //横坐标天数
        $data['dayMonth'] = $day_month;
        $data['xAxisData'] = $months;
        $data['series'] = $months_value;
        apiSuccess($data);
    }

    //全部电机指定天
    public function factoryDjDayList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        if (empty($param['time'])) {
            $param['time'] = date('Y-m-d');
        }

        $day_time = strtotime(date('Y-m-d', strtotime($param['time'])));

        if ($day_time > time()) apiError('日期间隔不能超过今天');



        $yesterday_time = $day_time - 86400;
        // $where[] = ['a.day_time', '=', $day_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];
        if ($factory_id > 0) {
            $where[] = ['c.id', '=', $factory_id];
        }
         $where[] = ['b.is_del', '=', 1];

        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->where('a.day_time', $day_time)
            ->field('a.*,b.title as dj_title')
            ->order('c.sort asc,b.sort asc,b.id desc')
            ->select()->toArray();
        $avgbg_yesterday_list_temp =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->where('a.day_time', $yesterday_time)
            ->field('a.*,b.title as dj_title')
            ->order('c.sort asc,b.sort asc,b.id asc')
            ->select()->toArray();

        foreach ($avgbg_yesterday_list_temp as $k => $v) {
            $avgbg_yesterday_list[$v['device_id']] = $v;
        }

        $series[0]['name'] = date('Y-m-d', $yesterday_time);
        $series[0]['type'] = 'bar';
        $series[0]['barGap'] = '0%';
        $series[0]['data'] = [];
        // barGap: '10%',          // 相邻柱状图间隔
        // barCategoryGap: '20%',  // 不同系列间隔
        //今天
        $series[1]['name'] = date('Y-m-d', $day_time);
        $series[1]['type'] = 'bar';
        $series[1]['data'] = [];
        // apiSuccess($avgbg_list);
        $yAxisData = [];
        $yAxisLabel = [];
        foreach ($avgbg_list as $k => $v) {
            $series[1]['data'][] = $this->jkdChange($v['jkd']);
            if (isset($avgbg_yesterday_list[$v['device_id']])) {
                $series[0]['data'][] = $this->jkdChange($avgbg_yesterday_list[$v['device_id']]['jkd']);
            } else {
                $series[0]['data'][] = 0;
            }
            $yAxisData[] = $v['dj_title'];
            $yAxisLabel[] = $v['device_id'];
        }

        $data = [];
        $data['series'] = $series;
        $data['yAxisData'] = array_reverse($yAxisData);
        $data['yAxisLabel'] = $yAxisLabel;
        apiSuccess($data);
    }


    public function factoryDjDayDayList()
    {
        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;
        $start_time = strtotime(date('Y-m-d', strtotime($param['start_time'])));
        $end_time = strtotime(date('Y-m-d', strtotime($param['end_time'])));


        $days = ($end_time - $start_time) / 86400;
        if ($days > 365) apiError('日期间隔不能超过一年');


        $where[] = ['a.day_time', '>=', $start_time];
        $where[] = ['a.day_time', '<=', $end_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];


        $where[] = ['a.device_id', '=', $device_id];
        $where[] = ['b.is_del', '=', 1];

        $day_month = [];
        $months = [];
        $n = 0;
        $months_date = 'd';
        if ($days > 31) {
            $months_date = 'm-d';
        }
        while (strtotime('-' . $n . ' day', $end_time) >= $start_time) {
            array_unshift($day_month, strtotime(date('Y-m-d', strtotime('-' . $n . ' day', $end_time))));
            array_unshift($months, date($months_date, strtotime('-' . $n . ' day', $end_time)));
            $n++;
        }

        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*')
            ->order('a.day_time asc')
            ->select()->toArray();;

        $series_data = [];
        $new_avgbg_list = [];
        foreach ($avgbg_list as $v) {
            $new_avgbg_list[$v['day_time']] = $v;
        }

        foreach ($day_month as $k => $v) {
            if (isset($new_avgbg_list[$v])) {
                $series_data[$k] = $this->jkdChange($new_avgbg_list[$v]['jkd']);
            } else {
                $series_data[$k] = 0;
            }
        }

        $series[0]['data'] = $series_data;
        $series[0]['type'] = 'line';

        $data['series'] = $series;
        $data['xAxisData'] = $months;
        apiSuccess($data);
    }
    
        /**
     * 电机详情
     */
    public function factoryAdminDjInfo()
    {

        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;
        if ($device_id <= 0) apiError();

        $data = [];

        $info =  djModel::where('device_id', $device_id)->where('is_del', 1)->order('id desc')->find();
        $dj_doc =  DjDoc::where('dj_id', $info['id'])->where('is_del',1)->order('add_time desc')->select();

        // $sys = 'LuAn.MaiJie.LuAn.LuYang.MaiJie.FengJi_12_22549';
        $sys = $info['element'];
		$value = $sys.'.AdvancedParameters.Physical';
		$result = $this->get_opc_value($value);
		//var_dump($result);
		$aes_param = [];
	    if($result['Code']=='10000'){
			$aes_param = json_decode($result['ResultData'][0]['Value']);		    				
		
	    }
	    if(!is_array($aes_param)) $aes_param =[];
        // $where[] = ['a.DeviceId', '=', $device_id];

        // $field = "a.CreateDate,a.DeviceId,b.*";
        // $aes_param = Db::connect('aes')->table('aestrend')
        //     ->alias('a')
        //     ->join(['aestrendphysicalparameters' => 'b'], " a.Id=b.TrendId")
        //     ->where($where)
        //     ->order('CreateDate desc')
        //     ->field($field)
        //     ->find();
        // $aes_param=[];    
        // apiSuccess($aes_param);
        if (empty($aes_param)) {
            $aes_param['ActivePower'] = ''; //有功功率
            // $aes_param['ReactivePower'] = round($aes_param['ReactivePower'], 3);
            $aes_param['THD'] = '';//总谐波
            $aes_param['VrRms'] = '';//R相电压
            $aes_param['Voltagebalance'] = '';//电压平衡度
            $aes_param['CurrentBalance'] = '';
            $aes_param['FifthHarmonic'] = '';//5次谐波
            $aes_param['IrRms'] = '';//R相电流
            $aes_param['SignalFrequency'] = '';//频率
            $aes_param['EleventhHarmonic'] = '';//11次谐波
            $aes_param['ItRms'] = '';//T相电流
            $aes_param['IsRms'] = '';//S相电流
            $aes_param['ThirteenthHarmonic'] = '';//13次谐波
            $aes_param['SeventhHarmonic'] = '';//7次谐波
            $aes_param['ThirdHarmonic'] = '';//3次谐波
            $aes_param['VsRms'] = '';//S相电压
            $aes_param['VtRms'] = '';//T相电压
            $aes_param['PowerFactor'] = '';//功率因数：
            $aes_param['PhaseAngle'] = '';//相角
            $aes_param['Admittance'] = '';//导纳
            $aes_param['NinthHarmonic'] = '';//9次谐波
        } else {
            $aes_param['ActivePower'] = round($aes_param[11], 3); //有功功率
            // $aes_param['ReactivePower'] = round($aes_param['ReactivePower'], 3);
            $aes_param['THD'] = round($aes_param[22], 3);//总谐波
            $aes_param['VrRms'] = round($aes_param[3]*1.732, 3);//R相电压
            $aes_param['Voltagebalance'] = round($aes_param[9], 3);//电压平衡度
            $aes_param['CurrentBalance'] = round($aes_param[10], 3);
            $aes_param['FifthHarmonic'] = round($aes_param[24], 3);//5次谐波
            $aes_param['IrRms'] = round($aes_param[4], 3);//R相电流
            $aes_param['SignalFrequency'] = round($aes_param[12], 3);//频率
            $aes_param['EleventhHarmonic'] = round($aes_param[27], 3);//11次谐波
            $aes_param['ItRms'] = round($aes_param[8], 3);//T相电流
            $aes_param['IsRms'] = round($aes_param[6], 3);//S相电流
            $aes_param['ThirteenthHarmonic'] = round($aes_param[28], 3);//13次谐波
            $aes_param['SeventhHarmonic'] = round($aes_param[25], 3);//7次谐波
            $aes_param['ThirdHarmonic'] = round($aes_param[23], 3);//3次谐波
            $aes_param['VsRms'] = round($aes_param[5]*1.732, 3);//S相电压
            $aes_param['VtRms'] = round($aes_param[7]*1.732, 3);//T相电压
            $aes_param['PowerFactor'] = round($aes_param[1], 3);//功率因数：
            $aes_param['PhaseAngle'] = round($aes_param[2], 3);//相角
            $aes_param['Admittance'] = round($aes_param[0], 3);//导纳
            $aes_param['NinthHarmonic'] = round($aes_param[26], 3);//9次谐波
        }


        $aes_param2 = Db::connect('aes')->table('aesdevicestatushistory')
            ->where('DeviceId', $device_id)
            ->where('CreateDate', '>=',  date('Y-m-01'))
            ->order('Id asc')
            ->select();
        $temp = Db::connect('aes')->table('aesdevicestatushistory')
            ->where('DeviceId', $device_id)
            ->where('CreateDate', '<=',  date('Y-m-01'))
            ->where('CreateDate', '>=',  date('Y-m-d',strtotime(date('Y-m-01'))-86400))
            // ->limit(50)
            ->order('Id desc')
            ->find(); //apiSuccess($temp);
            
        $runStatus = 1;//关
        if($temp){
            if($temp['MotorStatus'] > 0){
                 $runStatus = 2;//关
            }
        }    
        
        $runs = [];
        $runStart = strtotime(date('Y-m-01'));
        $duration_time = 0;
       

        foreach ($aes_param2 as $item) {
            if ($runStatus == 1 && $item['MotorStatus'] > 0) {
                $runStart = strtotime($item['CreateDate']);
                $runStatus = 2;
            } elseif ($runStatus == 2 && $item['MotorStatus'] == 0 && $runStart != null) {
                // 记录结束运行的时间点，并计算运行时长
                $runEnd = strtotime($item['CreateDate']);
                $duration = $runEnd - $runStart;
                $runs[] = [
                    'StartTime' => date('Y-m-d H:i:s', $runStart),
                    'EndTime' => date('Y-m-d H:i:s', $runEnd),
                    'Duration' => gmdate('H:i:s', $duration), // 运行时长，格式为时:分:秒
                ];
                $duration_time += $duration;
                $runStart = null;
                $runStatus = 1;
            }
        }
        if ($runStatus == 2 && $runStart && $runStart != null) {
            $runEnd = time();
            $duration = $runEnd - $runStart;
            $duration_time += $duration;
            $runs[] = [
                    'StartTime' => date('Y-m-d H:i:s', $runStart),
                    'EndTime' => date('Y-m-d H:i:s', $runEnd),
                    'Duration' => gmdate('H:i:s', $duration), // 运行时长，格式为时:分:秒
                ];
        }
        $aes_param['run_time'] = round($duration_time / 60);

        $data['info'] = $info;
        $data['dj_doc'] = $dj_doc;
        $data['aes_param'] = $aes_param;
        apiSuccess($data);
    }
    
    
     /*
     *电机报告
     */
    public function djReportList()
    {
        $param = $this->request->param();

        $dj_id = $param['dj_id'] ?? 0;

        if ($dj_id > 0) {
            $where[] = ['a.dj_id', '=', $dj_id];
        }


        $field = 'a.*,c.title as dj_title';

        $order = 'a.add_time desc,a.id desc';
        //组合查询数组
        $filter = [
            "where" => $where,
            "field" => $field,
            'order' =>  $order,
            'limit' =>  isset($param['limit']) ? $param['limit'] : 10,
            'page' =>  isset($param['page']) ? $param['page'] : 1,
            'join' => [
                ['dj c', 'c.id = a.dj_id'],
            ]
        ];
        $model = new DjReport();
        $data = $model->db_join($filter);

        foreach ($data['list'] as $k => $v) {
            $data['list'][$k]['label_title'] = $v['dj_title'] . '电机_' . date('Y年m月',$v['start_month']) . '-' . date('Y年m月',$v['end_month']) . '报告';
            $data['list'][$k]['pdf_url'] = request()->domain().$v['pdf_url'];
        }

        apiSuccess(['list'=>$data]);
    }
    
    /**
     * 首页检修计划 未开始
     */
    public function djRepairList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        $where[] = ['b.admin_id', '=', $this->_adminId()];

        if ($factory_id > 0) {
            $where[] = ['a.dj_factory_id', '=', $factory_id];
        }
        
        if(isset($param['bar_id']) && !empty($param['bar_id'])){
            $where[] = ['a.bar_id','=',$param['bar_id']];
        }
        if(isset($param['status']) && !empty($param['status'])){
            $where[] = ['a.status','=',$param['status']];
        }
        if(isset($param['dj_id']) && !empty($param['dj_id'])){
            $where[] = ['a.dj_id','=',$param['dj_id']];
        }


        // $where[] = ['a.status', '=', 1];

        $field = 'a.*,c.title as dj_title';

        $order = 'a.add_time desc,a.id desc';
        //组合查询数组
        $filter = [
            "where" => $where,
            "field" => $field,
            'order' =>  $order,
            'append'=>['status_title'],
            'limit' =>  isset($param['limit']) ? $param['limit'] : 1,
            'page' =>  isset($param['page']) ? $param['page'] : 1,
            'join' => [
                ['dj_factory_admin b', 'b.dj_factory_id = a.dj_factory_id'],
                ['dj c', 'c.id = a.dj_id'],
            ]
        ];
        $model = new DjRepair();
        $data = $model->db_join($filter);

        foreach ($data['list'] as $k => $v) {
            $data['list'][$k]['label_title'] = $v['bar_title'] . $v['repair_title'];
            $data['list'][$k]['add_time'] = date('Y-m-d',strtotime($v['add_time']));
        }

        apiSuccess(['list'=>$data]);
    }
    
     public function djRepairCate()
    {
        $data = [];

        $dj = function ($query) {
            $query->where('is_del', 1);
        };

        $factory_list =  DjFactory::alias('a')
            ->join('dj_factory_admin b', 'b.dj_factory_id = a.id')
            ->where('b.admin_id', $this->_adminId())
            ->where('a.is_del', 1)
            ->field('a.*')
            ->select()->toArray();

        array_unshift($factory_list,['id'=>'','title'=>'全部工厂']);
        
        
        $bar_list = Db::name('cate')->where('type','module')->order('sort desc,id desc')->field('id,name as title')->select()->toArray();
        array_unshift($bar_list,['id'=>'','title'=>'全部组件']);
        
        $status_list=[
            ['id'=>'','title'=>'全部状态'],
            ['id'=>'1','title'=>'未开始'],
            ['id'=>'2','title'=>'正常'],
            ['id'=>'3','title'=>'异常'],
            ];
        
        $data['factory_list'] = $factory_list;
        $data['bar_list'] = $bar_list;
        $data['status_list'] = $status_list;

        apiSuccess($data);
    }
    

    //看到这里了。。。。。
    
        public function djFactoryReportList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        $where[] = ['b.admin_id', '=', $this->_adminId()];

        if ($factory_id > 0) {
            $where[] = ['a.dj_factory_id', '=', $factory_id];
        }
        if(isset($param['uname']) && !empty($param['uname'])){
            $where[] = ['e.account', 'like', '%'.$param['uname'].'%'];
         }


        $field = 'a.*,c.title as factory_title,e.account as admin_account';

        $order = 'a.add_time desc,a.id desc';
        //组合查询数组
        $filter = [
            "where" => $where,
            "field" => $field,
            'order' =>  $order,
            'limit' =>  isset($param['limit']) ? $param['limit'] : 10,
            'page' =>  isset($param['page']) ? $param['page'] : 1,
            'join' => [
                ['dj_factory_admin b', 'b.dj_factory_id = a.dj_factory_id'],
                ['dj_factory c', 'c.id = a.dj_factory_id'],
                ['admin e', 'e.id = a.admin_id'],
            ]
        ];
        $model = new DjFactoryReport();
        $data = $model->db_join($filter);

        foreach ($data['list'] as $k => $v) {
            $data['list'][$k]['label_title'] = $v['factory_title'] . '工厂_' . date('Y年m月',$v['start_month']) . '-' . date('Y年m月',$v['end_month']) . '报告';
            $data['list'][$k]['pdf_url'] = request()->domain().$v['pdf_url'];
            $data['list'][$k]['add_time'] = date('Y-m-d',strtotime($v['add_time']));
        }

        apiSuccess(['list'=>$data]);
    }
    
    
    //电机详情状态
    
     public function factoryDjDayJkdList()
    {
        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;
        $start_time = strtotime(date('Y-m-d', strtotime($param['start_time'])));
        $end_time = strtotime(date('Y-m-d', strtotime($param['end_time'])));

        $days = ($end_time - $start_time) / 86400;
        if ($days > 365) apiError('日期间隔不能超过一年');


        $where[] = ['a.day_time', '>=', $start_time];
        $where[] = ['a.day_time', '<=', $end_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];


        $where[] = ['a.device_id', '=', $device_id];

        $day_month = [];
        $months = [];
        $n = 0;
        $months_date = 'd';
        if ($days > 31) {
            $months_date = 'm-d';
        }
        while (strtotime('-' . $n . ' day', $end_time) >= $start_time) {
            array_unshift($day_month, strtotime(date('Y-m-d', strtotime('-' . $n . ' day', $end_time))));
            array_unshift($months, date($months_date, strtotime('-' . $n . ' day', $end_time)));
            $n++;
        }

        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*')
            ->order('a.day_time asc')
            ->select()->toArray();;

        $series_data = [];
        $new_avgbg_list = [];
        foreach ($avgbg_list as $v) {
            $new_avgbg_list[$v['day_time']] = $v;
        }

        foreach ($day_month as $k => $v) {
            if (isset($new_avgbg_list[$v])) {
                $series_data[$k] = $this->jkdChange($new_avgbg_list[$v]['jkd']);
            } else {
                $series_data[$k] = 0;
            }
        }

        foreach ($day_month as $k => $v) {
            $day_month[$k] = date('Y-m-d', $v);
        }

        $series[0]['data'] = $series_data;
        $series[0]['type'] = 'line';

        $data['series'] = $series;
        $data['xAxisData'] = $months;
        $data['dayMonth'] = $day_month;
        apiSuccess($data);
    }
    
      public function jkdChange($v){
        if ($v > 75) { //0-20
                // $ba = $v - 75;
                // $temp =  $ba / 1.25 + 0;
                $temp = 80 - ($v * 0.8);
            } elseif ($v > 50 && $v <= 75) { //20-40
                // $ba = $v - 50;
                // $temp =    $ba / 1.25 + 20;
                $temp = 80 - ($v * 0.8);
            } elseif ($v > 25 && $v <= 50) { //40-60

                // $ba = $v - 25;
                // $temp =    $ba / 1.25 + 40;
                $temp = 80 - ($v * 0.8);
            } elseif ($v > 0 && $v <= 25) {  //60-80
                // $ba = $v - 0;
                // $temp =  $ba / 1.25 + 60;
                $temp = 80 - ($v * 0.8);
            } else {
                $temp = 0;
            }
            return $temp;
    }



public function factoryDjDayBarList()
    {
        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;

        // if (empty($param['time'])) {
        //     $param['time'] = date('Y-m-d');
        // }

        // $day_time = strtotime(date('Y-m-d', strtotime($param['time'])));

        // if ($day_time > time()) apiError('日期间隔不能超过今天');
        if(isset($param['time']) && !empty($param['time'])){
            $where[] = ['a.day_time','<=',strtotime($param['time'].' 23:59')];
        }



        // $yesterday_time = $day_time - 86400;
        // $where[] = ['a.day_time', '=', $day_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];
        $where[] = ['b.is_del', '=', 1];
        if ($device_id > 0) {
            $where[] = ['a.device_id', '=', $device_id];
        }
        // var_dump($where);
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $avgbg_list_temp =   DjLogBg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*')
            ->order('a.add_time desc')
            ->limit(2)
            ->select();
        $avgbg_list= $avgbg_list_temp[0];
        $avgbg_yesterday_list= $avgbg_list_temp[1];
        // $avgbg_list =   DjLogAvgbg::alias('a')
        //     ->join('dj b', 'b.device_id = a.device_id')
        //     ->join('dj_factory c', 'c.id = b.dj_factory_id')
        //     ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
        //     ->where($where)
        //     ->field('a.*')
        //     ->order('a.day_time asc')
        //     ->find();
        // $avgbg_yesterday_list_temp =  DjLogAvgbg::alias('a')
        //     ->join('dj b', 'b.device_id = a.device_id')
        //     ->join('dj_factory c', 'c.id = b.dj_factory_id')
        //     ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
        //     ->where($where)
        //     ->where('a.day_time', $yesterday_time)
        //     ->field('a.*,b.title as dj_title')
        //     ->order('a.day_time asc')
        //     ->select()->toArray();

        // $avgbg_yesterday_list = [];
        // foreach ($avgbg_yesterday_list_temp as $k => $v) {
        //     $avgbg_yesterday_list[$v['device_id']] = $v;
        // }
        $yesterday_time='';
        if($avgbg_yesterday_list){
            $yesterday_time = $avgbg_yesterday_list['add_time'];
        }

        $series[0]['name'] = $yesterday_time ?$yesterday_time:'';
        $series[0]['type'] = 'bar';
        $series[0]['barGap'] = '0%';
        $series[0]['data'] = [];
        //今天
        $series[1]['name'] = $avgbg_list['add_time']??'';
        $series[1]['type'] = 'bar';
        $series[1]['data'] = [];
        // apiSuccess($avgbg_list);
        $yAxisData = array_reverse(['不平衡不对中', '负载', '松动', '轴承', '转子', '定子']);

        if($avgbg_list){
            $series[1]['data'][] =  $this->barChange($avgbg_list['bar6_new']);
            $series[1]['data'][] =  $this->barChange($avgbg_list['bar5_new']);
            $series[1]['data'][] =  $this->barChange($avgbg_list['bar4_new']);
            $series[1]['data'][] =  $this->barChange($avgbg_list['bar1_new']);
            $series[1]['data'][] =  $this->barChange($avgbg_list['bar3_new']);
            $series[1]['data'][] =  $this->barChange($avgbg_list['bar2_new']);
           
            // $series[1]['data'][] = $this->barChange($avgbg_list['bar2_new']);
            // $series[1]['data'][] =  $this->barChange($avgbg_list['bar3_new']);
            // $series[1]['data'][] =  $this->barChange($avgbg_list['bar1_new']);
            // $series[1]['data'][] =  $this->barChange($avgbg_list['bar4_new']);
            // $series[1]['data'][] =  $this->barChange($avgbg_list['bar5_new']);
            // $series[1]['data'][] =  $this->barChange($avgbg_list['bar6_new']);

        }else{
            $series[1]['data'][] = 0;
            $series[1]['data'][] =  0;
            $series[1]['data'][] =  0;
            $series[1]['data'][] =  0;
            $series[1]['data'][] =  0;
            $series[1]['data'][] =  0;
        }

        if (isset($avgbg_yesterday_list)) {
            $series[0]['data'][] =  $this->barChange($avgbg_list['bar6_new']);
            $series[0]['data'][] =  $this->barChange($avgbg_list['bar5_new']);
            $series[0]['data'][] =  $this->barChange($avgbg_list['bar4_new']);
            $series[0]['data'][] =  $this->barChange($avgbg_list['bar1_new']);
            $series[0]['data'][] =  $this->barChange($avgbg_list['bar3_new']);
            $series[0]['data'][] =  $this->barChange($avgbg_list['bar2_new']);
            // $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar2_new']);
            // $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar3_new']);
            // $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar1_new']);
            // $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar4_new']);
            // $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar5_new']);
            // $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar6_new']);
        } else {
            $series[0]['data'][] = 0;
            $series[0]['data'][] = 0;
            $series[0]['data'][] = 0;
            $series[0]['data'][] = 0;
            $series[0]['data'][] = 0;
            $series[0]['data'][] = 0;
        }

        // $series[0]['data'] = array_reverse($series[0]['data']);
        // $series[1]['data'] = array_reverse($series[1]['data']);

        $data = [];
        $data['series'] = $series;
        $data['yAxisData'] = $yAxisData;
        $data['yAxisLabel'] = array_reverse(['bar2', 'bar3', 'bar1', 'bar4', 'bar5', 'bar6']);
        // $data['yAxisLabel'] = array_reverse(['bar2', 'bar3', 'bar1', 'bar4', 'bar5', 'bar6']);
        apiSuccess($data);
    }
   
    //全部电机指定天
    // public function factoryDjDayBarList()
    // {
    //     $param = $this->request->param();

    //     $device_id = $param['device_id'] ?? 0;

    //     if (empty($param['time'])) {
    //         $param['time'] = date('Y-m-d');
    //     }

    //     $day_time = strtotime(date('Y-m-d', strtotime($param['time'])));

    //     if ($day_time > time()) apiError('日期间隔不能超过今天');



    //     $yesterday_time = $day_time - 86400;
    //     $where[] = ['a.day_time', '=', $day_time];
    //     $where[] = ['d.admin_id', '=', $this->_admin['id']];
    //     $where[] = ['b.is_del', '=', 1];
    //     if ($device_id > 0) {
    //         $where[] = ['a.device_id', '=', $device_id];
    //     }

    //     error_reporting(E_ERROR | E_WARNING | E_PARSE);
    //     $avgbg_list =   DjLogAvgbg::alias('a')
    //         ->join('dj b', 'b.device_id = a.device_id')
    //         ->join('dj_factory c', 'c.id = b.dj_factory_id')
    //         ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
    //         ->where($where)
    //         ->field('a.*')
    //         ->order('a.day_time asc')
    //         ->find();
    //     $avgbg_yesterday_list_temp =  DjLogAvgbg::alias('a')
    //         ->join('dj b', 'b.device_id = a.device_id')
    //         ->join('dj_factory c', 'c.id = b.dj_factory_id')
    //         ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
    //         ->where($where)
    //         ->where('a.day_time', $yesterday_time)
    //         ->field('a.*,b.title as dj_title')
    //         ->order('a.day_time asc')
    //         ->select()->toArray();

    //     $avgbg_yesterday_list = [];
    //     foreach ($avgbg_yesterday_list_temp as $k => $v) {
    //         $avgbg_yesterday_list[$v['device_id']] = $v;
    //     }


    //     $series[0]['name'] = date('Y-m-d', $yesterday_time);
    //     $series[0]['type'] = 'bar';
    //     $series[0]['barGap'] = '0%';
    //     $series[0]['data'] = [];
    //     //今天
    //     $series[1]['name'] = date('Y-m-d', $day_time);
    //     $series[1]['type'] = 'bar';
    //     $series[1]['data'] = [];
    //     // apiSuccess($avgbg_list);
    //     $yAxisData = array_reverse(['不平衡不对中', '负载', '松动', '轴承', '转子', '定子']);

    //     $series[1]['data'][] = $this->barChange($avgbg_list['bar2']);
    //     $series[1]['data'][] =  $this->barChange($avgbg_list['bar3']);
    //     $series[1]['data'][] =  $this->barChange($avgbg_list['bar1']);
    //     $series[1]['data'][] =  $this->barChange($avgbg_list['bar4']);
    //     $series[1]['data'][] =  $this->barChange($avgbg_list['bar5']);
    //     $series[1]['data'][] =  $this->barChange($avgbg_list['bar6']);

    //     if (isset($avgbg_yesterday_list)) {
    //         $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar1']);
    //         $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar2']);
    //         $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar3']);
    //         $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar4']);
    //         $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar5']);
    //         $series[0]['data'][] =  $this->barChange($avgbg_yesterday_list['bar6']);
    //     } else {
    //         $series[0]['data'][] = 0;
    //         $series[0]['data'][] = 0;
    //         $series[0]['data'][] = 0;
    //         $series[0]['data'][] = 0;
    //         $series[0]['data'][] = 0;
    //         $series[0]['data'][] = 0;
    //     }


    //     $data = [];
    //     $data['series'] = $series;
    //     $data['yAxisData'] = $yAxisData;
    //     $data['yAxisLabel'] = array_reverse(['bar2', 'bar3', 'bar1', 'bar4', 'bar5', 'bar6']);
    //     apiSuccess($data);
    // }
    
        public function factoryDjDayBarDayList()
    {
        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;
        $start_time = strtotime(date('Y-m-d', strtotime($param['start_time'])));
        $end_time = strtotime(date('Y-m-d', strtotime($param['end_time'])));

        $days = ($end_time - $start_time) / 86400;
        if ($days > 365) apiError('日期间隔不能超过365天');

        $bar = $param['bar'] ?? 'bar1';

        $where[] = ['a.day_time', '>=', $start_time];
        $where[] = ['a.day_time', '<=', $end_time];
        $where[] = ['d.admin_id', '=', $this->_adminId()];

        $where[] = ['a.device_id', '=', $device_id];

        $avgbg_list =  DjLogAvgbg::alias('a')
            ->join('dj b', 'b.device_id = a.device_id')
            ->join('dj_factory c', 'c.id = b.dj_factory_id')
            ->join('dj_factory_admin d', 'd.dj_factory_id = c.id')
            ->where($where)
            ->field('a.*')
            ->order('a.day_time asc')
            ->select()->toArray();

        $day_month = [];
        $months = [];
        $n = 0;
        $months_date = 'd';
        if ($days > 31) {
            $months_date = 'm-d';
        }
        while (strtotime('-' . $n . ' day', $end_time) >= $start_time) {
            array_unshift($day_month, strtotime(date('Y-m-d', strtotime('-' . $n . ' day', $end_time))));
            array_unshift($months, date($months_date, strtotime('-' . $n . ' day', $end_time)));
            $n++;
        }

        $series_data = [];
        $new_avgbg_list = [];
        foreach ($avgbg_list as $v) {
            $new_avgbg_list[$v['day_time']] = $v;
        }

        foreach ($day_month as $k => $v) {
            if (isset($new_avgbg_list[$v])) {
                $series_data[$k] = $this->barChange($new_avgbg_list[$v][$bar]);
            } else {
                $series_data[$k] = 0;
            }
        }



        $series[0]['data'] = $series_data;
        $series[0]['type'] = 'line';

        foreach ($day_month as $k => $v) {
            $day_month[$k] = date('Y-m-d', $v);
        }

        $data['series'] = $series;
        $data['xAxisData'] = $months;
        $data['dayMonth'] = $day_month;
        apiSuccess($data);
    }

    //实时
    public function factoryDjDayBarAesList()
    {
        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;
        if ($device_id <= 0) apiError();

        $bar_new = $param['bar_new'] ? $param['bar_new'] . '_new' : 'bar1_new';
        
        if($bar_new == 'bar1_new'){//松动Loose_Foundation_Components
            $bar_new = 'Loose_Foundation_Components';
        }elseif($bar_new == 'bar6_new'){ //定子
            $bar_new = 'Loose_Wind_Stator_Sh_Circ';
        }elseif($bar_new == 'bar2_new'){ //不平衡不对中
            $bar_new = 'Unbal_Mis_Coupling_Bearing'; 
        }elseif($bar_new == 'bar4_new'){ //轴承
            $bar_new = 'Bearing'; 
        }elseif($bar_new == 'bar3_new'){ //负载
            $bar_new = 'Transmis_Elem_Driven_Eq';
        }elseif($bar_new == 'bar5_new'){ //转子
            $bar_new = 'Rotor'; 
        }

        $start_time = strtotime(date('Y-m-d', strtotime($param['time'])));
        $end_time = $start_time + 86400;


        // $time = strtotime("-1 minute");
        // $after_time = strtotime(date('Y-m-d H:i', $time)) + 60;

        $where[] = ['a.CreateDate', '>=', date('Y-m-d H:i', $start_time)];
        $where[] = ['a.CreateDate', '<', date('Y-m-d H:i', $end_time)];
        $where[] = ['a.deviceID', '=', $device_id];
        
        $field = "a.CreateDate,a.DeviceId,b.*";
        $avgbg_list = Db::connect('aes')->table('aestrend')
            ->alias('a')
            ->join(['aestrenddiagnosticparameters' => 'b'], " a.id=b.TrendId")
            ->where($where)
            ->order('CreateDate asc')
            ->field($field)
            ->select();
        // apiSuccess($avgbg_list);
        // $avgbg_list = Db::connect('aes')->table('equipmentreport')->where($where)->select();

        $series_data = [];
        $months = [];
        foreach ($avgbg_list as $k => $v) {
            if (isset($v[$bar_new])) {
                $series_data[$k] = $this->barChange($v[$bar_new]);
            } else {
                $series_data[$k] = 0;
            }
            $months[$k] = date('H:i', strtotime($v['CreateDate']));
        }


        $series[0]['data'] = $series_data;
        $series[0]['type'] = 'line';

        $data['series'] = $series;
        $data['xAxisData'] = $months;
        apiSuccess($data);
    }

    //三相
    public function factoryDjDayTsAesList()
    {
        $param = $this->request->param();

        $device_id = $param['device_id'] ?? 0;
        if ($device_id <= 0) apiError();

        $type = $param['type'] ?? 'type';
        // $type = 'Voltagebalance';

        $start_time = strtotime(date('Y-m-d', strtotime($param['time'])));
        $end_time = $start_time + 86400;

        // $time = strtotime("-1 minute");
        // $after_time = strtotime(date('Y-m-d H:i', $time)) + 60;

        $where[] = ['a.CreateDate', '>=', date('Y-m-d H:i', $start_time)];
        $where[] = ['a.CreateDate', '<', date('Y-m-d H:i', $end_time)];
        $where[] = ['a.DeviceId', '=', $device_id];

        // $avgbg_list = Db::connect('aes')->table('equipmentreport')->where($where)->select();

        $field = "a.CreateDate,a.DeviceId,b.*";
        $avgbg_list = Db::connect('aes')->table('aestrend')
            ->alias('a')
            ->join(['aestrendphysicalparameters' => 'b'], " a.id=b.TrendId")
            ->where($where)
            ->order('CreateDate asc')
            ->field($field)
            ->select();
        if($type == 'Voltagebalance'){
            $type = 'VoltageBalance';
        }    

        $series_data = [];
        $months = [];

        if ($type == 'vrms' || $type == 'irms') {

            if ($type == 'vrms') {
                $series_data2 = [];
                $series_data3 = [];
                foreach ($avgbg_list as $k => $v) {
                    if (isset($v['VrRms'])) {
                        $series_data[$k] = round($v['VrRms'], 3);
                    } else {
                        $series_data[$k] = 0;
                    }
                    if (isset($v['VsRms'])) {
                        $series_data2[$k] = round($v['VsRms'], 3);
                    } else {
                        $series_data2[$k] = 0;
                    }
                    if (isset($v['VtRms'])) {
                        $series_data3[$k] = round($v['VtRms'], 3);
                    } else {
                        $series_data3[$k] = 0;
                    }
                    $months[$k] = date('H:i', strtotime($v['CreateDate']));
                }

                $series[0]['data'] = $series_data;
                $series[0]['type'] = 'line';
                $series[0]['name'] = 'Vr';

                $series[1]['data'] = $series_data2;
                $series[1]['type'] = 'line';
                $series[1]['name'] = 'Vs';

                $series[2]['data'] = $series_data3;
                $series[2]['type'] = 'line';
                $series[2]['name'] = 'Vt';
            } else if ($type == 'irms') {
                $series_data2 = [];
                $series_data3 = [];
                foreach ($avgbg_list as $k => $v) {
                    if (isset($v['IrRms'])) {
                        $series_data[$k] = round($v['IrRms'], 3);
                    } else {
                        $series_data[$k] = 0;
                    }
                    if (isset($v['IsRms'])) {
                        $series_data2[$k] = round($v['IsRms'], 3);
                    } else {
                        $series_data2[$k] = 0;
                    }
                    if (isset($v['ItRms'])) {
                        $series_data3[$k] = round($v['ItRms'], 3);
                    } else {
                        $series_data3[$k] = 0;
                    }
                    $months[$k] = date('H:i', strtotime($v['CreateDate']));
                }

                $series[0]['data'] = $series_data;
                $series[0]['type'] = 'line';
                $series[0]['name'] = 'Ir';

                $series[1]['data'] = $series_data2;
                $series[1]['type'] = 'line';
                $series[1]['name'] = 'Is';

                $series[2]['data'] = $series_data3;
                $series[2]['type'] = 'line';
                $series[2]['name'] = 'It';
                $series[0]['position'] = 'top';
                $series[1]['position'] = 'top';
                $series[2]['position'] = 'top';
            }
        } else {
            foreach ($avgbg_list as $k => $v) {
                if (isset($v[$type])) {
                    $series_data[$k] = $v[$type];
                } else {
                    $series_data[$k] = 0;
                }
                $months[$k] = date('H:i', strtotime($v['CreateDate']));
            }

            $series[0]['data'] = $series_data;
            $series[0]['type'] = 'line';
            // $series[0]['position'] = 'top';
            // $series[0]['name'] = 'line';
        }


        $data['series'] = $series;
        $data['xAxisData'] = $months;
        apiSuccess($data);
    }
    
    public function factoryAdminRepairCate()
    {
        $param = $this->request->param();
        $data = [];
        $list = Cate::whereIn('type', ['module', 'repair'])->where('status', 1)->field('id,type,name,sort')->order('sort desc,id desc')->select();
        $module_cate = [];
        $repair_cate = [];
        foreach ($list as $k => $v) {
            if ($v['type'] == 'module') {
                array_push($module_cate, $v);
            } elseif ($v['type'] == 'repair') {
                array_push($repair_cate, $v);
            }
        }
        $data['module_cate'] = $module_cate;
        $data['repair_cate'] = $repair_cate;
        $repair_status[] = ['id' => 1, 'name' => '未开始']; //1未开始 2正常 3异常
        $repair_status[] = ['id' => 2, 'name' => '正常']; //1未开始 2正常 3异常
        $repair_status[] = ['id' => 3, 'name' => '异常']; //1未开始 2正常 3异常
        $data['repair_status'] = $repair_status;
        
        $data['info'] = DjRepair::where('id',$param['id'])->append(['status_title'])->find();
        apiSuccess($data);
    }
    
        public function factoryAdminRepairEdit()
    {
        $param = $this->request->param();

        if (!isset($param['bar_id']) || empty($param['bar_id'])) apiError('检修组件不能为空');
        if (!isset($param['repair_id']) || empty($param['repair_id'])) apiError('检修分类不能为空');
        if (!isset($param['status']) || empty($param['status'])) apiError('检修结果不能为空');
        if (!isset($param['uname']) || empty($param['uname'])) apiError('检修人员不能为空');
        if (!isset($param['repair_date']) || empty($param['repair_date'])) apiError('计划检修时间不能为空');


        $dj_id = $param['dj_id'];
        $dj =  djModel::where('id', $dj_id)->find();
        $factory =  DjFactory::where('id', $dj['dj_factory_id'])->find();

        $bar_title = Db::name('cate')->where('id', $param['bar_id'])->value('name');
        $repair_title = Db::name('cate')->where('id', $param['repair_id'])->value('name');


        $data['dj_factory_id'] = $factory['id'];
        $data['dj_id'] = $dj_id;
        $data['status'] = $param['status'];
        $data['bar_id'] = $param['bar_id'];
        $data['bar_title'] = $bar_title;
        $data['repair_id'] = $param['repair_id'];
        $data['repair_title'] = $repair_title;
        if (isset($param['uname'])) {
            $data['uname'] = $param['uname'];
        }
        if (isset($param['url']) && $param['url'] != 'null') {
            $data['url'] = $param['url'];
        }
        if (isset($param['remark'])) {
            $data['remark'] = $param['remark'];
        }
        $data['repair_date'] = $param['repair_date'];
        if (isset($param['repair_true_date']) && $param['repair_true_date'] != 'null') {
            
            $data['repair_true_date'] = $param['repair_true_date'];
        }

        if (!isset($param['repair_date'])) {
            $data['repair_time'] = null;
        } else {
            $data['repair_time'] = strtotime($param['repair_date']);
        }
        if (!isset($param['repair_true_date']) || $param['repair_true_date'] == 'null') {
            $data['repair_true_time'] = null;
        } else {
            $data['repair_true_time'] = strtotime($param['repair_true_date']);
        }
    //   apiSuccess($data);
        if (isset($param['id']) && !empty($param['id'])) {
            $data['up_time'] = time();
            DjRepair::where('id', $param['id'])->update($data);
        } else {
            $data['add_time'] = time();
            $data['up_time'] = time();
            DjRepair::insert($data);
        }

// apiError();
        apiSuccess([],200,'保存成功');
    }
    
        public function get_opc_value($value){
			 header("Content-type:application/json;charset=utf-8");
			$url="http://39.105.5.73/Api/ServiceApi/GetListBq";
			if(is_array($value)){
				$data = json_encode($value);
			}else{				
				$param = [$value];
                
		    	$data = json_encode($param);
				
			}
			$arr = $this->http_post_data($url, $data);
			$arr = json_decode($arr,true);
			return $arr;
	}
	
	function http_post_data($url, $data_string) {
		  $ch = curl_init();
		  curl_setopt($ch, CURLOPT_POST, 1);
		  curl_setopt($ch, CURLOPT_URL, $url);
		  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
          curl_setopt($ch, CURLOPT_RETURNTRANSFER,true); 
		  curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Content-Type: application/json; charset=utf-8",
			"Content-Length: " . strlen($data_string))
		  );
		 curl_setopt($ch, CURLOPT_ENCODING, 'deflate');

       $result = curl_exec($ch);

      return $result;
}
    
}
