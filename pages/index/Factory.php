<?php
/*基础接口*/

namespace app\appapi\controller;

use app\common\controller\ApiBase;
use app\common\logic\BidLogic;
use think\facade\Request;
use think\facade\Db;
use app\common\model\DjNotice;

/**
 * 
 */
class Factory extends ApiBase
{
    protected $noAuth = [];

    public function factoryNoticeList()
    {
        $param = $this->request->param();

        $factory_id = $param['factory_id'] ?? 0;

        $admin_id = Db::name('admin')->where('openid',$this->user->wx_mini_openid)->order('id desc')->value('id');

        $where[] = ['b.admin_id', '=', $admin_id];

        if ($factory_id > 0) {
            $where[] = ['c.dj_factory_id', '=', $factory_id];
        }
        $tabCurrent = 0;
        if (isset($param['status']) && !empty($param['status'])) {
            $where[] = ['a.status', '=', $param['status']];
            $tabCurrent = $param['status'];
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
                ['dj c', 'c.device_id = a.device_id and c.is_del=1'],
                ['dj_factory_admin b', 'b.dj_factory_id = c.dj_factory_id'],

            ]
        ];
        $model = new DjNotice();
        $data['list'] = $model->db_join($filter);


        $where_where[] = ['b.admin_id', '=', $admin_id];
        if ($factory_id > 0) {
            $where_where[] = ['a.dj_factory_id', '=', $factory_id];
        }

        $where1 = $where_where;
        $where2 = $where_where;
        $where3 = $where_where;

        $where2[] = ['a.status', '=', 2];
        $where3[] = ['a.status', '=', 1];
        $filter = [
            "count" => true,
            "where" => $where1,
            'join' => [
                ['dj c', 'c.device_id = a.device_id and c.is_del=1'],
                ['dj_factory_admin b', 'b.dj_factory_id = c.dj_factory_id'],

            ]
        ];
        $model = new DjNotice();
        $count = $model->db_join($filter);
        $data['count_count'] = $count['count'];

        $filter = [
            "count" => true,
            "where" => $where2,
            'join' => [
                ['dj c', 'c.device_id = a.device_id and c.is_del=1'],
                ['dj_factory_admin b', 'b.dj_factory_id = c.dj_factory_id'],

            ]
        ];
        $model = new DjNotice();
        $count = $model->db_join($filter);
        $data['count_count1'] = $count['count'];

        $filter = [
            "count" => true,
            "where" => $where3,
            'join' => [
                ['dj c', 'c.device_id = a.device_id and c.is_del=1'],
                ['dj_factory_admin b', 'b.dj_factory_id = c.dj_factory_id'],

            ]
        ];
        $model = new DjNotice();
        $count = $model->db_join($filter);
        $data['count_count2'] = $count['count'];

        $tabList = ['全部(' . $data['count_count'] . ')', '未处理(' . $data['count_count2'] . ')', '已处理(' . $data['count_count1'] . ')'];
        $data['tabList'] = $tabList;
        $data['tabCurrent'] = $tabCurrent;
        apiSuccess($data);
    }
    
    public function factoryNoticeLook(){
        $param = $this->request->param();

        $id = $param['id'];
        $model = new DjNotice();
        $model->where('id',$id)->update(['status'=>2]);
        apiSuccess();
    }
    
}
